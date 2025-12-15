from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Task(Base):
    __tablename__ = "todo_list"

    task_id = Column(Integer, primary_key=True, index=True)
    content = Column(String(200), nullable=False)
    is_done = Column(Boolean, default=False)
