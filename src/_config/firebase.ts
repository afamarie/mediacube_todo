import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDhUUAa4B8JmxM8ky00WtQ7DHZ9PhBjn0k',
  authDomain: 'todo-a4cba.firebaseapp.com',
  projectId: 'todo-a4cba',
  storageBucket: 'todo-a4cba.appspot.com',
  messagingSenderId: '442811097732',
  appId: '1:442811097732:web:faad849e248cb38d3e18d1'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
