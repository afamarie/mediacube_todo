import axios from 'axios'
import { type Task } from './models'

export const getTasks = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://mediacube-todo.free.beeceptor.com/todos')
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
      .finally(() => {})
  })
}

export const updateTasks = (tasks: Task[]) => {
  return new Promise((resolve, reject) => {
    axios
      .post('https://mediacube-todo.free.beeceptor.com/todos', tasks)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
      .finally(() => {})
  })
}
