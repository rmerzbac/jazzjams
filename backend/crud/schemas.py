from typing import List, Union

from pydantic import BaseModel, Field
import datetime
import random

class EditBase(BaseModel):
    reason: Union[str, None] = None
    editor: str
    date_time: datetime.datetime

class EditCreate(EditBase):
    pass

class Edit(EditBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class JamBase(BaseModel):
    name: str
    days: str
    start_time: datetime.time
    end_time: Union[datetime.time, None] = None
    location: str
    info: Union[str, None] = None
    website: Union[str, None] = None
    edits: List[Edit] = []

class JamCreate(JamBase):
    pass


class Jam(JamBase):
    id: str
    is_active: bool

    class Config:
        orm_mode = True
