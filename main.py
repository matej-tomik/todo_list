from typing import Optional
from fastapi import FastAPI, HTTPException
import datetime
from pydantic import BaseModel
from create_DB_and_table import create_db_and_table
import mysql.connector


try:
    table = mysql.connector.connect(
     host='localhost',
     user='root',
     password='my-secret-pw',
     database='todo_list_DB',
    )
    if table.is_connected():
        print('Connected to MySQL database')

except mysql.connector.Error as e:
    print('Creating new MySQL database')
    create_db_and_table()


table = mysql.connector.connect(
     host='localhost',
     user='root',
     password='my-secret-pw',
     database='todo_list_DB',
    )
my_cursor = table.cursor()
app = FastAPI()


class PutTaskRequest(BaseModel):
    content: str
    user_name: str
    user_id: int
    is_done: bool = False
    task_id: Optional[int]


def get_current_time():
    return datetime.datetime.now().date()


@app.put("/create-task")
def create_task(put_task_request: PutTaskRequest):
    my_cursor.execute("use todo_list_DB")
    table.commit()
    my_cursor.execute("insert into todo_list (user_name, user_id, content, is_done) "
                      f"values (%s,%s,%s,%s)", (
                        put_task_request.user_name,
                        put_task_request.user_id,
                        put_task_request.content,
                        put_task_request.is_done)
                      )
    table.commit()
    my_cursor.execute(f'select task_id from todo_list where user_id = {put_task_request.user_id} order by task_id desc')
    task = {
        "content": put_task_request.content,
        "is_done": False,
        "task_id": my_cursor.fetchone()[0]
    }
    return {"task": task}


@app.get("/get-task/{user_id},{task_id}")
def get_task(user_id: int, task_id: int):
    my_cursor.execute("use todo_list_DB")
    table.commit()
    my_cursor.execute("select * from todo_list "
                      "where "
                      f"user_id = {user_id} "
                      f"and "
                      f"task_id = {task_id}")
    task = my_cursor.fetchone()
    if not task:
        raise HTTPException(status_code=404, detail=f"Task {task_id} not found")
    return task


@app.get("/list-tasks/{user_id}")
def list_tasks(user_id: int):
    my_cursor.execute("use todo_list_DB")
    table.commit()
    my_cursor.execute("select * from todo_list where "
                      f"user_id = {user_id} "
                      "limit 20")
    tasks = my_cursor.fetchall()
    if tasks:
        return {"tasks": tasks}
    else:
        raise HTTPException(status_code=404, detail=f"User {user_id} have no tasks")


@app.put("/update-task")
def update_task(put_task_request: PutTaskRequest):
    my_cursor.execute("use todo_list_DB")
    table.commit()
    my_cursor.execute("update todo_list "
                      "set "
                      f'content = "{put_task_request.content}", '
                      f"is_done = {put_task_request.is_done} "
                      "where "
                      f"user_id = {put_task_request.user_id} "
                      f"and "
                      f"task_id = {put_task_request.task_id}")
    if my_cursor.rowcount <= 0:
        raise HTTPException(status_code=404, detail=f"Task {put_task_request.task_id} not found")
    else:
        table.commit()


@app.delete("/delete-task/{user_id},{task_id}")
def delete_task(user_id: int, task_id: int):
    my_cursor.execute("use todo_list_DB")
    table.commit()
    my_cursor.execute("delete from todo_list "
                      "where "
                      f"user_id = {user_id} "
                      "and "
                      f"task_id = {task_id}")
    if my_cursor.rowcount > 0:
        table.commit()
        return {"deletion of task_id was SUCCESSFUL": task_id}
    else:
        return {"deletion of task_id was UNSUCCESSFUL": task_id}
