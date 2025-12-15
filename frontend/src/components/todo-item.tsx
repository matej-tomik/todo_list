import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Trash2, Edit2 } from "lucide-react"
import { type Task } from "@/types/task"

interface TaskItemProps {
  task: Task
  onToggle: () => void
  onUpdate: (updates: Partial<Task>) => void
  onDelete: () => void
}

export function TodoItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(task.content)

  const handleSave = () => {
    if (editContent.trim()) {
      onUpdate({
        content: editContent,
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditContent(task.content)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="rounded-lg bg-card p-4 shadow-sm">
        <Input
          type="text"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="mb-3 border-border bg-background"
          autoFocus
        />
        <div className="flex gap-2">
          <Button onClick={handleSave} size="sm" className="flex-1">
            Save
          </Button>
          <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`group flex items-start gap-3 rounded-lg bg-card p-4 transition-all shadow-sm ${
        task.is_done ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className={`mt-1 flex-shrink-0 rounded-md p-1.5 transition-colors ${
          task.is_done
            ? "bg-primary text-primary-foreground"
            : "border border-border text-muted-foreground hover:bg-muted"
        }`}
        aria-label={task.is_done ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.is_done && <Check className="h-4 w-4" />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium transition-all ${
            task.is_done ? "line-through text-muted-foreground" : "text-foreground"
          }`}
        >
          {task.content}
        </p>
        {task.is_done && <p className="mt-1 text-xs text-muted-foreground">{task.is_done}</p>}
      </div>

      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          onClick={() => setIsEditing(true)}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          aria-label="Edit task"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          onClick={onDelete}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
