import { Button } from '@mui/material'
import React from 'react'
import Swal from 'sweetalert2'
import { deleteDoc, doc } from 'firebase/firestore'
import { dbFirestore } from '../../../firebaseConfig/firebaseconfig'

const DeleteTask = ({id, callbackGet}) => {
  const deleteAlert = () => {
    Swal.fire({
        title: "Estas seguro?",
        text: `Se eliminara la tarea con id: ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText:"Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteTask()
        }
      });
  }

  const deleteTask = async() => {
    const task = doc(dbFirestore, "tasks", id)
    await deleteDoc(task)
    callbackGet()
  }

  return (
    <Button onClick={deleteAlert}>
        ELIMINAR
    </Button>
  )
}

export default DeleteTask