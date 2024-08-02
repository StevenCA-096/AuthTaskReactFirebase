import { Button } from '@mui/material'
import React from 'react'
import { deleteUserS } from '../../../services/usersService';
import Swal from 'sweetalert2';

const DeleteUser = ({ userId, closeDrawer}) => {

    const deleteAlert = async () => {
        closeDrawer()
        Swal.fire({
            title: "Estas seguro?",
            text: `Se eliminara el usuario con id: ${userId}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMethod()
            }
        });
    }

    const deleteMethod = async () => {
        try {
            const result = await deleteUserS(userId)
            if (result.status == 200) {
                Swal.fire({
                    title: `Se elimino el usuario con el id: ${userId}`
                })   
            }
        } catch (error) {
            Swal.fire({
                title: "Error al intentar borrar el usuario"
            })
        }
    }
    return (
        <Button onClick={deleteAlert}>
            Eliminar
        </Button>
    )
}

export default DeleteUser