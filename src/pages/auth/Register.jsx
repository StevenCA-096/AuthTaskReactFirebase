import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogged } from '../../redux/authSlice'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig/firebaseconfig'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
const Register = () => {
    const authDispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoadingRegister, setisLoadingRegister] = useState(false)

    const login = () => {
        authDispatch(setLogged())
    }

    const handleRegister = async(e) => {
        e.preventDefault()
        setisLoadingRegister(true)
        if (password.length < 6) {
            setisLoadingRegister(false)

            return Swal.fire({
                title: "La contraseña debe tener al menos 6 caracteres"
            })
        }
        try {

            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser
            setisLoadingRegister(false)
            console.log(user)
            if (user) {
                Swal.fire({
                    title:"Registro exitoso!"
                })
            }
        } catch (error) {
            setisLoadingRegister(false)

            return Swal.fire({
                title: "No se logro crear el usuario" + error
            })
        }
    }

    return (
        <Box
            sx={{
                color: 'black',
                border: 2,
                p: 4,
                borderRadius: 3,
                borderColor: 'teal',
                boxShadow: 3,
                bgcolor: 'background.paper',
                maxWidth: 400,
                mx: 'auto',
                mt: 5,
            }}
        >

            <form onSubmit={handleRegister}>
                <Stack direction={'column'} gap={4}>
                    <div>
                        <Typography variant='h3' gutterBottom>Registro</Typography>
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            label="Usuario"
                            variant="outlined"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <Stack gap={3}>
                            <div>
                                <Button
                                    variant='contained'
                                    onClick={login}
                                    fullWidth
                                    sx={{
                                        bgcolor: 'teal',
                                        '&:hover': {
                                            bgcolor: 'darkcyan',
                                        },
                                    }}
                                    disabled={isLoadingRegister}
                                    type='submit'
                                >
                                    Registrarme
                                </Button>
                            </div>
                            <div>
                                <NavLink to={'/login'}>
                                    <Button
                                        variant='contained'
                                        onClick={login}
                                        fullWidth
                                        sx={{
                                            bgcolor: 'teal',
                                            '&:hover': {
                                                bgcolor: 'darkcyan',
                                            },
                                        }}
                                    >
                                        Volver
                                    </Button>
                                </NavLink>
                            </div>
                        </Stack>
                    </div>
                </Stack>
            </form>
        </Box>
    )
}

export default Register