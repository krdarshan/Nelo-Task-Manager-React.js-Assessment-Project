"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/types/task"

interface TaskFormProps {
  onSubmit: (task: Task | Omit<Task, "id">) => void
  initialTask?: Task
  onCancel: () => void
}

export default function TaskForm({ onSubmit, initialTask, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium")
  const [dueDate, setDueDate] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title)
      setDescription(initialTask.description)
      setPriority(initialTask.priority)
      setDueDate(initialTask.dueDate)
    }
  }, [initialTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!title.trim()) newErrors.title = "Title is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!dueDate) newErrors.dueDate = "Due date is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const task: Omit<Task, "id"> = {
      title,
      description,
      priority,
      dueDate,
      completed: initialTask?.completed ?? false,
    }

    if (initialTask) {
      onSubmit({ ...task, id: initialTask.id, completed: initialTask.completed })
    } else {
      onSubmit(task)
    }

    // Reset form
    setTitle("")
    setDescription("")
    setPriority("Medium")
    setDueDate("")
    setErrors({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialTask ? "Edit Task" : "Create New Task"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.dueDate && <p className="text-destructive text-sm mt-1">{errors.dueDate}</p>}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {initialTask ? "Update Task" : "Create Task"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
