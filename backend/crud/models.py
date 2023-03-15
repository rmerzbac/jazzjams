from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Time, DateTime
from sqlalchemy.orm import relationship

from database import Base
from uuid import uuid4


class Jam(Base):
    __tablename__ = "jams"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    sun = Column(Boolean)
    mon = Column(Boolean)
    tue = Column(Boolean)
    wed = Column(Boolean)
    thu = Column(Boolean)
    fri = Column(Boolean)
    sat = Column(Boolean)
    custom = Column(String)
    start_time = Column(Time)
    end_time = Column(Time)
    location = Column(String)
    information = Column(String)
    website = Column(String)
    is_active = Column(Boolean, default=True)
    edit_reason = Column(String)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.id = str(uuid4())
