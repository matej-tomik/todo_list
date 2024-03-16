import mysql.connector


def create_db_and_table():
    db = mysql.connector.connect(
        host='localhost',
        user='root',
        password='my-secret-pw'
    )
    cursor = db.cursor()
    cursor.execute("create database todo_list_DB")

    table = mysql.connector.connect(
        host='localhost',
        user='root',
        password='my-secret-pw',
        database='todo_list_DB'
    )

    table.cursor().execute("CREATE table todo_list (user_name varchar(50),"
                           " user_id int,"
                           " content varchar(200),"
                           " is_done bool,"
                           " task_id int primary key auto_increment)"
                           )
