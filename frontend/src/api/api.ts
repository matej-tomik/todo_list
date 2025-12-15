import { type Task } from "@/types/task"

const API = import.meta.env.VITE_API_URL;

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API}/get-task` )
  return res.json()
}

export async function createTask(
  content: string,
): Promise<Task> {
  const task = {
    content,
    is_done: false,
  }

  const res = await fetch(`${API}/create-task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })

  return res.json()
}

export async function updateTask(
  task: Task,
  updates: Partial<Task>
): Promise<Task> {
  const updatedTask = { ...task, ...updates }
  const res = await fetch(`${API}/update-task/${task.task_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  })

  return res.json()
}

export async function deleteTask(task: Task): Promise<void> {
  await fetch(
    `${API}/delete-task/${task.task_id}`,
    { method: "DELETE" }
  )
}

export async function deleteCompleted(): Promise<void> {
  await fetch(
    `${API}/delete-completed/`,
    { method: "DELETE" }
  )
}