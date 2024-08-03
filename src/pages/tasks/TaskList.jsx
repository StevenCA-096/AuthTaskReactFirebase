import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, List, ListItem, ListItemText, Radio, RadioGroup, } from "@mui/material";
import CreateTask from './components/CreateTask';
import DeleteTask from './components/DeleteTask';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, updateTask } from '../../services/tasksService';

const TaskList = () => {
  const authStatus = useSelector((state) => state.auth)

  const [tasks, setTasks] = useState([])
  const [filteredTasks, setTasksFiltered] = useState([])
  const [filter, setFilter] = useState('all')

  const getTasks = async () => {
    const data = await getAllTasks()
    setTasks(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })
      ))
    setTasksFiltered(
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

  useEffect(() => {
    if (filter == 'all') {
      setTasksFiltered(tasks)
    } else {
      setTasksFiltered(tasks.filter((task) => task.done.toString() == filter))
    }
  }, [filter, tasks])

  const updateTaskState = async(id, done) => {
    const result = await updateTask(id,done)
    getTasks()
  }

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

          <FormControl sx={{marginY:2}}>
            <FormLabel id="demo-radio-buttons-group-label">Mostrar</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={(selected) => setFilter(selected.target.value)}
            >
              <FormControlLabel value="all" control={<Radio />} label="Todas" />
              <FormControlLabel value={true} control={<Radio />} label="Completas" />
              <FormControlLabel value={false} control={<Radio />} label="Pendientes" />
            </RadioGroup>
          </FormControl>

          <List dense={false}>
            {
              filteredTasks ? (
                filteredTasks.length > 0 ? (
                  filteredTasks.map((task) =>
                    <ListItem key={task.id} sx={{ mb: 2, boxShadow: 1, borderRadius: 2 }}>
                      <ListItemText
                        primary={`${task.name} ${task.done ? "(COMPLETADA)" : "(PENDIENTE)"}`}
                        secondary={<><DeleteTask id={task.id} callbackGet={getTasks} /> <Button onClick={()=> updateTaskState(task.id, !task.done)}>Cambiar a {task.done?"Pendiente":"Finalizado"}</Button></>}
                        sx={{ border: 1, borderRadius: 2, padding: 2, bgcolor: 'background.default', textDecoration: task.done?"line-through":""}}
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