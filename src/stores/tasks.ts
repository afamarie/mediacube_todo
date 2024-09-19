import { defineStore } from 'pinia'

export interface Task {
  id: string
  body: string
  done: boolean
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[]
  }),
  getters: {
    activeTasks: (state) => state.tasks.filter((task) => !task.done),
    doneTasks: (state) => state.tasks.filter((task) => task.done),
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
      this.tasks.push(newTask)
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
    updateList(newList: Task[]) {
      this.tasks = newList
    }
  }
})
