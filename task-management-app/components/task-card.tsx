"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Task } from "@/types/task"
import { CheckCircle2, Circle, Trash2, Edit2 } from "lucide-react"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

const priorityColors: Record<Task["priority"], { bg: string; text: string }> = {
  High: { bg: "bg-red-100 dark:bg-red-900", text: "text-red-700 dark:text-red-200" },
  Medium: { bg: "bg-yellow-100 dark:bg-yellow-900", text: "text-yellow-700 dark:text-yellow-200" },
  Low: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-700 dark:text-green-200" },
}

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id)
    }
  }

  const priorityColor = priorityColors[task.priority]

  return (
    <Card className={`p-4 transition-all ${task.completed ? "opacity-60 bg-muted" : ""}`}>
      <div className="flex gap-4">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="flex-shrink-0 pt-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        >
          {task.completed ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <Circle className="h-6 w-6" />}
        </button>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-muted-foreground" : ""}`}>
              {task.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColor.bg} ${priorityColor.text}`}>
              {task.priority}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(task)} aria-label="Edit task">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                aria-label="Delete task"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
