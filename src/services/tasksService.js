import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { dbFirestore } from "../firebaseConfig/firebaseconfig"

const tasksCollection = collection(dbFirestore, "tasks")

export const getAllTasks = async () => {
    const tasksList = await getDocs(tasksCollection)
    return tasksList
}

export const saveTask = async(name) => {
    const result = await addDoc(tasksCollection, {name: name, done: false})
    return result
}

export const updateTask = async(id,done) => {
    console.log(id + " "+ done)
    const docRef = doc(dbFirestore, "tasks", id)
    try {
        const result = await updateDoc(docRef, { "done": done})
        return result
    } catch (error) {
        console.log("error: "+ error)
    }
   
}