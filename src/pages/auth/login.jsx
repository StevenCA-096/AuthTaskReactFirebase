import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogged } from '../../redux/authSlice'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig/firebaseconfig'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const UserLogin = () => {
  const authDispatch = useDispatch()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [isLoadingLogin, setisLoadingLogin] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setisLoadingLogin(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser
      setisLoadingLogin(false)

      console.log(user)
      if (user) {
        authDispatch(setLogged(user.providerData[0]))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      setisLoadingLogin(false)
      Swal.fire({
        title:"No se logro iniciar sesion",
        text:"Compruebe sus credenciales e intentelo de nuevo"
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

      <form onSubmit={handleLogin}>
        <Stack direction={'column'} gap={4}>
          <div>
            <Typography variant='h3' gutterBottom>Bienvenido</Typography>
          </div>
          <div>
            <TextField
              fullWidth
              label="Correo"
              variant="outlined"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              variant="outlined"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Stack gap={3}>
              <div>
                <Button
                  variant='contained'
                  fullWidth
                  disabled={isLoadingLogin}
                  sx={{
                    bgcolor: 'teal',
                    '&:hover': {
                      bgcolor: 'darkcyan',
                    },
                  }}
                  type='submit'
                >
                  Iniciar sesión
                </Button>
              </div>
              <div>
                <NavLink to={'/register'}>
                  <Button
                    variant='contained'
                    fullWidth
                    sx={{
                      bgcolor: 'teal',
                      '&:hover': {
                        bgcolor: 'darkcyan',
                      },
                    }}
                  >
                    Registrarme
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

export default UserLogin