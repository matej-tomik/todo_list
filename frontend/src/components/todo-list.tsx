import { TodoItem } from "@/components/todo-item"
import { type Task } from "@/types/task"

interface TaskListProps {
  tasks: Task[]
  onToggle: (task: Task) => void
  onUpdate: (task: Task, updates: Partial<Task>) => void
  onDelete: (task: Task) => void
}

export function TodoList({ tasks, onToggle, onUpdate, onDelete }: TaskListProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TodoItem
          key={task.task_id}
          task={task}
          onToggle={() => onToggle(task)}
          onUpdate={(updates) => onUpdate(task, updates)}
          onDelete={() => onDelete(task)}
        />
      ))}
    </div>
  )
}
