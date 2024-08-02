import { Expand } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, TextField } from '@mui/material'
import { createUserWithEmailAndPassword, updateCurrentUser } from 'firebase/auth'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { auth } from '../../../firebaseConfig/firebaseconfig'

const AddUser = ({ callbackGet }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoadingRegister, setisLoadingRegister] = useState(false)

    const handleNewUser = async (e) => {
        e.preventDefault()
        setisLoadingRegister(true)
        if (password.length < 6) {
            setisLoadingRegister(false)
            return Swal.fire({
                title: "La contraseña debe tener al menos 6 caracteres",
                icon:"warning"
            })
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser
            setisLoadingRegister(false)
            console.log(user)
            if (user) {
                Swal.fire({
                    title: "Usuario creado exitosamente!",
                    icon:"success"
                })
            }
        } catch (error) {
            setisLoadingRegister(false)

            return Swal.fire({
                title: "No se logro crear el usuario " ,
                text:"Error: "+error,
                icon:"error"
            })
        }
    }
    return (
        <Accordion>
            <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                expandIcon={<Expand />}
            >
                Click para agregar un nuevo usuario
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handleNewUser} >
                    <Stack sx={{ p: 2 }}>
                        <TextField
                            sx={{ mb: 2 }}
                            label="Email"
                            required
                            value={email}
                            type='email'
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                            sx={{ mb: 2 }}
                            label="Contraseña"
                            required
                            type='password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button sx={{ mx: 2 }} type='submit' variant='contained' disabled={isLoadingRegister}>
                            Agregar usuario
                        </Button>
                    </Stack>
                </form>

            </AccordionDetails>
        </Accordion>
    )
}

export default AddUser