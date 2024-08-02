import { Box, Button, Drawer, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeleteUser from './DeleteUser'
import { updateUserEmail } from '../../../services/usersService'
import Swal from 'sweetalert2'

const UpdateUser = ({ uid, emailParam }) => {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState(emailParam)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email == '') {
            return setOpen(false)
        }

        try {
            const result = await updateUserEmail({
                uid: uid,
                email: email
            })
            if (result.status == 200) {
                setOpen(false)
                Swal.fire({
                    title: "Correo actualizado exitosamente",
                    icon: "success"
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Ocurrio un error al actualizar el correo.",
                icon: "success"
            })
        }
    }
    return (
        <>
            <Box>
                <Button onClick={() => setOpen(!open)} >
                    GESTIONAR
                </Button>
            </Box>

            <Drawer open={open} onClose={() => setOpen(false)} anchor='right' variant='temporary' >
                <form onSubmit={handleSubmit}>
                    <Box sx={{ padding: 3 }} gap={3}>
                        <Typography >Actualizar informacion de usuario</Typography>
                        <Stack direction={"column"}>
                            <div>
                                <TextField sx={{ marginTop: 1 }} label="Nuevo email" defaultValue={emailParam} onChange={(e) => setEmail(e.target.value)} type='emaik' />
                            </div>

                            <div style={{ paddingTop: 10 }}>
                                <Button type='submit' variant='contained' sx={{ marginX: 10 }} >Enviar</Button>
                            </div>
                        </Stack>
                    </Box>
                </form>
                <hr />
                <DeleteUser userId={uid} closeDrawer={()=>setOpen(false)}/>
            </Drawer >
        </>
    )
}

export default UpdateUser