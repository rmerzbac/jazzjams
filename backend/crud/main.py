from typing import List

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
    db_user = crud.get_jam_by_name(db, name=jam.name)
    if db_user and db_user.is_active == True:
        raise HTTPException(status_code=400, detail="A jam has already been created with this name")
    return crud.create_jam(db=db, jam=jam)


@app.get("/jams/", response_model=List[schemas.Jam])
def read_jams(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_jams(db, skip=skip, limit=limit)
    return users


@app.get("/jams/{jam_id}", response_model=schemas.Jam)
def read_jam(jam_id: int, db: Session = Depends(get_db)):
    db_jam = crud.get_jam(db, jam_id=jam_id)
    if db_jam is None:
        raise HTTPException(status_code=404, detail="Jam not found")
    return db_jam


@app.post("/jams/{jam_id}/edits/", response_model=schemas.Edit)
def create_edit(
    user_id: int, edit: schemas.EditCreate, db: Session = Depends(get_db)
):
    return crud.create_jam_edit(db=db, edit=edit, jam_id=jam_id)


@app.get("/edits/", response_model=List[schemas.Edit])
def read_edits(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    edits = crud.get_edits(db, skip=skip, limit=limit)
    return edits

@app.get("/edits/{owner_id}", response_model=List[schemas.Edit])
def read_edits_by_jam(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    edits = crud.get_edits_by_jam(db, owner_id)
    return edits

@app.delete("/jams/{jam_id}", response_model=schemas.Jam)
def delete_jam(jam_id: str, db: Session = Depends(get_db)):
    db_jam = crud.delete_jam(db, jam_id=jam_id)
    if db_jam is None:
        raise HTTPException(status_code=404, detail="Jam not found")
    return db_jam
