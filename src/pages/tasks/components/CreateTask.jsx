import { Expand } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, TextField } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { dbFirestore } from '../../../firebaseConfig/firebaseconfig'

const CreateTask = ({callbackGet}) => {
  const [name, setName] = useState('')

  const taskCollection = collection(dbFirestore, "tasks")

  const save = async(event)=>{
    event.preventDefault()
    await addDoc(taskCollection, {name: name})
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