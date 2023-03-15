from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Time, DateTime
from sqlalchemy.orm import relationship

from database import Base
from uuid import uuid4


class Jam(Base):
    __tablename__ = "jams"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    days = Column(String)
    start_time = Column(Time)
    end_time = Column(Time)
    location = Column(String)
    info = Column(String)
    website = Column(String)
    is_active = Column(Boolean, default=True)

    edits = relationship("Edit", back_populates="owner")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.id = str(uuid4())

class Edit(Base):
    __tablename__ = "edits"

    id = Column(Integer, primary_key=True, index=True)
    editor = Column(String)
    date_time = Column(DateTime)
    reason = Column(String)
    owner_id = Column(Integer, ForeignKey("jams.id"))

    owner = relationship("Jam", back_populates="edits")
