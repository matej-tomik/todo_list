import { useState, useEffect } from "react"
import { TodoList } from "@/components/todo-list"
import { TodoForm } from "@/components/todo-form"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Trash2 } from "lucide-react"
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteCompleted,
} from "@/api/api"
import { type Task } from "@/types/task"


export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  useEffect(() => {
    fetchTasks().then(setTasks)
  }, [])

  const addTask = async (title: string) => {
    const savedTask = await createTask(title)
    setTasks((prev) => [savedTask, ...prev])
  }


  const handleUpdate = async (task: Task, updates: Partial<Task>) => {
    const updated = await updateTask(task, updates)

    setTasks((prev) =>
      prev.map((t) =>
        t.task_id === updated.task_id ? updated : t
      )
    )
  }

  const handleDelete = async (task: Task) => {
    await deleteTask(task)

    setTasks((prev) =>
      prev.filter((t) => t.task_id !== task.task_id)
    )
  }

  const handleToggle = (task: Task) => {
    handleUpdate(task, { is_done: !task.is_done })
  }

  const filteredTodos = tasks.filter((task) => {
    if (filter === "active") return !task.is_done
    if (filter === "completed") return task.is_done
    return true
  })

  const completedCount = tasks.filter((t) => t.is_done).length
  const activeCount = tasks.length - completedCount

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-card flex items-center ">
      <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12 ">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">My Tasks</h1>
          <p className="mt-2 text-muted-foreground">Stay organized and get things done</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-3 md:gap-4">
          <div className="rounded-lg bg-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{tasks.length}</div>
            <div className="text-xs text-muted-foreground md:text-sm">Total Tasks</div>
          </div>
          <div className="rounded-lg bg-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{activeCount}</div>
            <div className="text-xs text-muted-foreground md:text-sm">Active</div>
          </div>
          <div className="rounded-lg bg-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{completedCount}</div>
            <div className="text-xs text-muted-foreground md:text-sm">Completed</div>
          </div>
        </div>

        {/* Form */}
        <div className="mb-8">
          <TodoForm onAdd={addTask} />
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2 border-b border-border pb-4">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button variant={filter === "active" ? "default" : "outline"} size="sm" onClick={() => setFilter("active")}>
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
          {tasks.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                try {
                  await deleteCompleted()
                  setTasks((prev) => prev.filter((t) => !t.is_done))
                } catch (err) {
                  console.error(err)
                }
              }}
              className="ml-auto text-destructive hover:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Done
            </Button>
          )}
        </div>

        {/* Todo List */}
        {filteredTodos.length > 0 ? (
          <TodoList tasks={filteredTodos} onToggle={handleToggle} onUpdate={handleUpdate} onDelete={handleDelete} />
        ) : (
          <div className="rounded-lg bg-card p-12 text-center">
            <p className="text-muted-foreground">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                  ? "No active tasks. Great job!"
                  : "No tasks yet. Add one to get started!"}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
