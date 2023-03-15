from sqlalchemy.orm import Session

import models, schemas


def get_jam(db: Session, jam_id: int):
    return db.query(models.Jam).filter(models.Jam.id == jam_id).first()


def get_jam_by_name(db: Session, name: str):
    return db.query(models.Jam).filter(models.Jam.name == name).first()


def get_jams(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Jam).filter(models.Jam.is_active == True).offset(skip).limit(limit).all()


def create_jam(db: Session, jam: schemas.JamCreate):
    db_jam = models.Jam(name=jam.name, days=jam.days, start_time=jam.start_time, end_time=jam.end_time, location=jam.location, info=jam.info, website=jam.website)
    db.add(db_jam)
    db.commit()
    db.refresh(db_jam)
    return db_jam

def delete_jam(db: Session, jam_id: int):
    db_jam = db.query(models.Jam).filter(models.Jam.id == jam_id).first()
    if db_jam:
        db_jam.is_active = False
        db.commit()
        db.refresh(db_jam)
    return db_jam

def get_edits(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Edit).offset(skip).limit(limit).all()

def get_edits_by_jam(db: Session, owner_id: str):
    return db.query(models.Edit).filter(models.Edit.owner == owner_id).all()

def create_jam_edit(db: Session, edit: schemas.EditCreate, jam_id: int):
    db_edit = models.Edit(**edit.dict(), owner_id=jam_id, reason=edit.reason, editor=edit.editor, date_time=edit.date_time)
    db.add(db_edit)
    db.commit()
    db.refresh(db_edit)
    return db_edit
