"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "./navbar"
import TaskForm from "./task-form"
import TaskList from "./task-list"
import FilterBar from "./filter-bar"
import SearchBar from "./search-bar"
import type { Task } from "@/types/task"
import { useDebounce } from "@/hooks/use-debounce"

interface DashboardProps {
  user: { email: string }
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearch = useDebounce(searchQuery, 300)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Background task automation - runs every 20 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        const pending = tasks.filter((t) => !t.completed)
        if (pending.length > 0) {
          console.log("Mock Mail: You have pending tasks. Complete them soon.")
        }
      },
      20 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [tasks])

  // Filter and search logic
  useEffect(() => {
    let result = tasks

    // Apply filter
    if (filter === "completed") {
      result = result.filter((t) => t.completed)
    } else if (filter === "pending") {
      result = result.filter((t) => !t.completed)
    } else if (filter === "high" || filter === "medium" || filter === "low") {
      result = result.filter((t) => t.priority === filter)
    }

    // Apply search
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase()
      result = result.filter(
        (t) => t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query),
      )
    }

    setFilteredTasks(result)
  }, [tasks, filter, debouncedSearch])

  const handleAddTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    }
    setTasks([...tasks, newTask])
    setShowForm(false)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    setEditingTask(null)
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Task Dashboard</h1>

          <div className="mb-6 flex gap-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <Button onClick={() => setShowForm(true)} className="whitespace-nowrap">
              Add Task
            </Button>
          </div>

          <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        </div>

        {showForm && (
          <div className="mb-8">
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              initialTask={editingTask || undefined}
              onCancel={() => {
                setShowForm(false)
                setEditingTask(null)
              }}
            />
          </div>
        )}

        <TaskList
          tasks={filteredTasks}
          onEdit={(task) => {
            setEditingTask(task)
            setShowForm(true)
          }}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      </main>
    </div>
  )
}
