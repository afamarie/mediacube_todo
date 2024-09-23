import { defineStore } from 'pinia'
import { type Task } from '@/_config/models'

import api from '@/_config/api'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[]
  }),

  getters: {
    doneIds: (state) => state.tasks.filter((task) => task.done).map((task) => task.id),
    totalActive: (state) => state.tasks.filter((task) => !task.done).length,
    totalDone: (state) => state.tasks.filter((task) => task.done).length
  },

  actions: {
    async fetchTasks() {
      await api.fetchTasks().then((response: Task[]) => {
        this.tasks = response
      })
    },

    async addTask(taskBody: string) {
      await api.addTask(taskBody).then((response: Task | null) => {
        if (response) {
          this.tasks.unshift(response)
        }
      })
    },

    async updateTask(id: string, updates: { [key: string]: string | boolean }) {
      await api
        .updateTask(id, updates)
        .then(() => {
          const index = this.tasks.findIndex((task) => task.id === id)

          if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...updates }
          }
        })
        .catch((err: any) => {
          throw err
        })
    },

    async toggleTaskStatus(id: string, done: boolean) {
      await this.updateTask(id, { done })
    },

    async editTask(id: string, body: string) {
      await this.updateTask(id, { body })
    },

    async deleteTask(id: string) {
      await api.deleteTask(id).then(() => {
        this.tasks = this.tasks.filter((task) => task.id !== id)
      })
    },

    async replace(oldIndex: number, newIndex: number, prevList: Task[]) {
      await api
        .replace(oldIndex, newIndex, prevList)
        .then(() => {})
        .catch((err: any) => {
          throw err
        })
    },

    async clearDone() {
      Promise.all(
        this.doneIds.map((id) => {
          if (id) this.deleteTask(id)
        })
      ).then(() => {
        this.tasks = this.tasks.filter((task) => !task.done)
      })
    },

    async markAllDone() {
      if (this.tasks.some((task) => !task.done)) {
        Promise.all(
          this.tasks.map((task) => {
            if (!task.done && task.id) {
              this.toggleTaskStatus(task.id, true)
            }
          })
        )
      } else {
        Promise.all(
          this.tasks.map((task) => {
            if (task.id) {
              this.toggleTaskStatus(task.id, false)
            }
          })
        )
      }
    }
  }
})
