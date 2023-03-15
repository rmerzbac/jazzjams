from sqlalchemy.orm import Session
import models, schemas
import datetime


def get_jam(db: Session, jam_id: int):
    return db.query(models.Jam).filter(models.Jam.id == jam_id).first()


def get_jam_by_name(db: Session, name: str):
    return db.query(models.Jam).filter(models.Jam.name == name).first()


def get_jams(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Jam).filter(models.Jam.is_active == True).offset(skip).limit(limit).all()


def create_jam(db: Session, jam: schemas.JamCreate):
    db_jam = models.Jam(name=jam.name, sun=jam.sun, mon=jam.mon, tue=jam.tue, wed=jam.wed, thu=jam.thu, fri=jam.fri, sat=jam.sat, custom=jam.custom, start_time=jam.start_time, end_time=jam.end_time, location=jam.location, information=jam.information, website=jam.website)
    db.add(db_jam)
    db.commit()
    db.refresh(db_jam)
    return db_jam

def edit_jam(db: Session, jam: schemas.JamCreate, id: str, reason: str):
    deleted = delete_jam(db, id, reason)
    if not deleted:
        return None
    return create_jam(db, jam)


def delete_jam(db: Session, jam_id: int, reason: str):
    db_jam = db.query(models.Jam).filter(models.Jam.id == jam_id).first()
    if db_jam:
        db_jam.is_active = False
        db_jam.edit_reason = reason
        db.commit()
        db.refresh(db_jam)
    return db_jam
