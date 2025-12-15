from typing import Optional
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import datetime
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Task, Base
from database import engine
from pydantic import BaseModel

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskCreate(BaseModel):
    content: str

class TaskUpdate(BaseModel):
    is_done: bool
    content: str

def get_current_time():
    return datetime.datetime.now().date()


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.post("/create-task")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(content=task.content)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@app.get("/get-task/{task_id}")
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.task_id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task

@app.get("/get-task")
def list_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@app.put("/update-task/{task_id}")
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.task_id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db_task.is_done = task.is_done
    db_task.content = task.content
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/delete-task/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.task_id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
@app.delete("/delete-completed")
def delete_task(db: Session = Depends(get_db)):
    deleted_count = (
        db.query(Task)
        .filter(Task.is_done == True)
        .delete(synchronize_session=False)
    )

    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")

    db.commit()
    return {"success": True, "deleted": deleted_count}
