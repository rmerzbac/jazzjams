from typing import List, Union

from pydantic import BaseModel, Field
import datetime
import random


class JamBase(BaseModel):
    name: str
    sun: bool
    mon: bool
    tue: bool
    wed: bool
    thu: bool
    fri: bool
    sat: bool
    custom: str
    start_time: datetime.time
    end_time: Union[datetime.time, None] = None
    location: str
    information: Union[str, None] = None
    website: Union[str, None] = None
    edit_reason: Union[str, None] = None

class JamCreate(JamBase):
    pass


class Jam(JamBase):
    id: str
    is_active: bool

    class Config:
        orm_mode = True
