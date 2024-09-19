import { defineStore } from 'pinia'
import { type Task } from '@/_config/models'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[]
  }),
  getters: {
    totalActive: (state) => state.tasks.filter((task) => !task.done).length,
    totalDone: (state) => state.tasks.filter((task) => task.done).length
  },
  actions: {
    addTask(taskBody: string) {
      const newTask: Task = {
        id: Date.now().toString(),
        body: taskBody,
        done: false
      }
      this.tasks.unshift(newTask)
    },
    toggleTaskStatus(taskId: string) {
      const task = this.tasks.find((task) => task.id === taskId)
      if (task) {
        task.done = !task.done
      }
    },
    editTask(taskBody: string, taskId: string) {
      const task = this.tasks.find((task) => task.id === taskId)
      if (task) {
        task.body = taskBody
      }
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
    },
    clearDone() {
      this.tasks = this.tasks.filter((task) => !task.done)
    },
    markAllDone() {
      this.tasks.forEach((task) => {
        task.done = true
      })
    },
    updateList(newList: Task[]) {
      this.tasks = newList
    }
  }
})
