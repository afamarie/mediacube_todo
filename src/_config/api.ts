import { type Task } from '@/_config/models'

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query
} from 'firebase/firestore'
import { db } from '@/_config/firebase'

export default {
  async fetchTasks(): Promise<Task[]> {
    try {
      const q = query(collection(db, 'tasks'), orderBy('updated', 'desc')) // sort from old to new
      const snapshot = await getDocs(q)
      const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Task)

      return tasks
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return []
    }
  },

  async addTask(taskBody: string): Promise<Task | null> {
    try {
      const newTask: Task = {
        body: taskBody,
        done: false,
        updated: Date.now() // add date for sorting,
      }

      const docRef = await addDoc(collection(db, 'tasks'), newTask)
      return { id: docRef.id, ...newTask }
    } catch (error) {
      console.error('Error adding task:', error)
      return null
    }
  },

  async updateTask(id: string, updates: { [key: string]: string | boolean }): Promise<void | null> {
    try {
      const taskRef = doc(db, 'tasks', id)
      await updateDoc(taskRef, updates)
    } catch (error) {
      console.error('Error updating task:', error)
      return null
    }
  },

  async deleteTask(id: string): Promise<void | null> {
    try {
      const docRef = doc(db, 'tasks', id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting task:', error)
      return null
    }
  },

  async replace(oldIndex: number, newIndex: number, prevList: Task[]): Promise<void | null> {
    try {
      const replaceTask = async (taskToMove: Task, taskToBeReplaced: Task) => {
        if (taskToMove.id && taskToBeReplaced) {
          const taskMovedRef = doc(db, 'tasks', taskToMove.id)
          await updateDoc(taskMovedRef, { updated: taskToBeReplaced.updated })
        }
      }

      if (oldIndex < newIndex) {
        for (let i = newIndex; i > oldIndex; i--) {
          const taskMoved = prevList[i]
          const taskReplaced = prevList[i - 1]

          await replaceTask(taskMoved, taskReplaced)
        }
      } else {
        for (let i = newIndex; i < oldIndex; i++) {
          const taskMoved = prevList[i]
          const taskReplaced = prevList[i + 1]

          await replaceTask(taskMoved, taskReplaced)
        }
      }

      await replaceTask(prevList[oldIndex], prevList[newIndex])

      return
    } catch (error) {
      console.error('Error replacing tasks:', error)
      return null
    }
  }
}
