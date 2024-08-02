import { Expand } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { saveTask } from '../../../services/tasksService'

const CreateTask = ({callbackGet}) => {
  const [name, setName] = useState('')
  
  const save = async(event)=>{
    event.preventDefault()
    await saveTask(name)
    await callbackGet()
    setName('')
  }
  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1-content"
        id="panel1-header"
        expandIcon={<Expand />}
      >
        Click para agregar una nueva tarea
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={save} >
          <Stack sx={{p:2}}>
            <TextField
              sx={{mb:2}}
              label="Nombre tarea"
              required
              value={name}
              onChange={(event)=>setName(event.target.value)}
            />
            <Button sx={{mx:30}} type='submit' variant='contained'>
              Agregar nuevas tarea
            </Button>
          </Stack>
        </form>

      </AccordionDetails>
    </Accordion>
  )
}

export default CreateTask