"use client"

import type { Task } from "@/types/task"
import TaskCard from "./task-card"
import { Card } from "@/components/ui/card"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground text-lg">No tasks found. Create one to get started!</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  )
}
