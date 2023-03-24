from typing import List
import datetime

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow requests from localhost:3000
origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://localhost",
    "http://localhost:8000",
    "https://jazzjams.vercel.app",
    "https://jazzjams.vercel.app/*",
    "http://JazzJamsLB032323-1615814258.us-east-2.elb.amazonaws.com",
    "http://JazzJamsLB032323-1615814258.us-east-2.elb.amazonaws.com/*",
    "https://JazzJamsLB032323-1615814258.us-east-2.elb.amazonaws.com",
    "https://JazzJamsLB032323-1615814258.us-east-2.elb.amazonaws.com/*",
    "http://jazzjamsapi.reidmerzbacher.com/",
    "http://jazzjamsapi.reidmerzbacher.com/*",
    "https://jazzjamsapi.reidmerzbacher.com/",
    "https://jazzjamsapi.reidmerzbacher.com/*",
    "https://jazzjams.reidmerzbacher.com",
    "https://jazzjams.reidmerzbacher.com/*",
    "http://jazzjams.reidmerzbacher.com",
    "http://jazzjams.reidmerzbacher.com/*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/jams/", response_model=schemas.Jam)
def create_jam(jam: schemas.JamCreate, db: Session = Depends(get_db)):
    db_jam = crud.get_jam_by_name(db, name=jam.name)
    if db_jam and db_jam.is_active == True:
        raise HTTPException(status_code=400, detail="A jam has already been created with this name")
    return crud.create_jam(db=db, jam=jam)


@app.get("/jams/", response_model=List[schemas.Jam])
def read_jams(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    jams = crud.get_jams(db, skip=skip, limit=limit)
    return jams


@app.get("/jams/{jam_id}", response_model=schemas.Jam)
def read_jam(jam_id: str, db: Session = Depends(get_db)):
    db_jam = crud.get_jam(db, jam_id=jam_id)
    if db_jam is None:
        raise HTTPException(status_code=404, detail="Jam not found")
    return db_jam

@app.put("/jams/{jam_id}", response_model=schemas.Jam)
def edit_jam(jam: schemas.JamCreate, jam_id: str, reason: str, db: Session = Depends(get_db)):
    db_jam = crud.edit_jam(db, jam, id=jam_id, reason="EDIT " + datetime.datetime.now().strftime("%I:%M%p %B %d, %Y: ") + reason)
    if db_jam is None:
        raise HTTPException(status_code=404, detail="Jam not found")
    return db_jam

@app.delete("/jams/{jam_id}", response_model=schemas.Jam)
def delete_jam(jam_id: str, reason: str, db: Session = Depends(get_db)):
    db_jam = crud.delete_jam(db, jam_id=jam_id, reason="DELETE " + datetime.datetime.now().strftime("%I:%M%p %B %d, %Y: ") + reason)
    if db_jam is None:
        raise HTTPException(status_code=404, detail="Jam not found")
    return db_jam
