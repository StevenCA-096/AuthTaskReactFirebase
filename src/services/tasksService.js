import { addDoc, collection, getDocs } from "firebase/firestore"
import { dbFirestore } from "../firebaseConfig/firebaseconfig"

const tasksCollection = collection(dbFirestore, "tasks")

export const getAllTasks = async () => {
    const tasksList = await getDocs(tasksCollection)
    return tasksList
}

export const saveTask = async(name) => {
    const result = await addDoc(tasksCollection, {name: name})
    return result
}