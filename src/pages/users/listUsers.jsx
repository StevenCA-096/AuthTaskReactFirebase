import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import useGetUsers from '../../hooks/useGetUsers';
import DeleteUser from './components/DeleteUser';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';



const listUsers = () => {

    const { users, loading } = useGetUsers()
    const [rows, setRows] = useState()

    const columns = [
        { field: 'id', headerName: 'User ID', width: 350 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: "actions",
            headerName: "Acciones",
            width: 250,
            renderCell: (params) => (
                <>
                    <UpdateUser uid={params.row.id} emailParam={params.row.email}/>
                    
                </>
            )
        }
    ];

    useEffect(() => {
        if (users) {
            const rows = users.map((user) => (
                {
                    id: user.uid,
                    email: user.email
                }
            )
            )
            console.log(rows)
            setRows(rows)
        }

    }, [users])

    return (
        <Container
            sx={{
                mt: 4, // margin-top: 4
                mb: 4, // margin-bottom: 4
                p: 2, // padding: 2
                borderRadius: 1, // border-radius: 1
                boxShadow: 3, // box-shadow: 3
                backgroundColor: 'white', // Background color
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid
                    item
                    sx={{
                        mb: 2, // margin-bottom: 2
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Lista de usuarios
                    </Typography>
                </Grid>

                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 1000,
                        mt: 3, 
                        p: 1, 
                        border: '1px solid #ddd',
                        borderRadius: 1, 
                        backgroundColor: '#fff',
                        boxShadow: 1, 
                    }}
                >
                    <AddUser />

                    {users ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            sx={{
                                mt: 1, 
                                height:500,
                                width:900
                            }}
                        />
                    ) : (
                        <Typography sx={{ mt: 2, color: '#999' }}>No hay usuarios</Typography>
                    )}
                </Box>
            </Box>
        </Container>
    )
}

export default listUsers