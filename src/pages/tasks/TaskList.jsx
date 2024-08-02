import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Box, Button, Grid, IconButton, List, ListItem, ListItemText, } from "@mui/material";
import CreateTask from './components/CreateTask';
import { getDocs, collection, getDoc, deleteDoc } from 'firebase/firestore';
import { dbFirestore } from '../../firebaseConfig/firebaseconfig';
import DeleteTask from './components/DeleteTask';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const authStatus = useSelector((state) => state.auth)

  const [tasks, setTasks] = useState([])

  const tasksCollection = collection(dbFirestore, "tasks")

  const getTasks = async () => {
    const data = await getDocs(tasksCollection)
    setTasks(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })
      ))
    console.log(tasks)
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (!authStatus.isAuthenticated) {
      navigate('/login')
    }
    getTasks()
  }, [])

  return (
    <>
      <Box
      sx={{
        width: "100%",
        border: 1,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.paper',
        mt: 5,
      }}
    >
      <Grid sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
        <CreateTask callbackGet={getTasks} />

        <List dense={false}>
          {
            tasks ? (
              tasks.length > 0 ? (
                tasks.map((task) =>
                  <ListItem key={task.id} sx={{ mb: 2, boxShadow: 1, borderRadius: 2 }}>
                    <ListItemText
                      primary={task.name}
                      secondary={<DeleteTask id={task.id} callbackGet={getTasks} />}
                      sx={{ border: 1, borderRadius: 2, padding: 2, bgcolor: 'background.default' }}
                    />
                  </ListItem>
                )) : (
                <ListItem sx={{ boxShadow: 1, borderRadius: 2 }}>
                  <ListItemText
                    primary="Aun no se han creado tareas"
                    sx={{ border: 1, borderRadius: 2, padding: 2, bgcolor: 'background.default' }}
                  />
                </ListItem>
              )
            ) : ("Cargando...")
          }
        </List>
      </Grid>
    </Box>
    </>
  )
}

export default TaskList