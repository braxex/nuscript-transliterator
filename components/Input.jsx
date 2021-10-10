import { useState } from 'react'
// components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// utils
import transliterator from '../utils/transliterator'

const Input = ({ title, label, source, setResponse }) => {
  const [fieldValue, setFieldValue] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setResponse(await transliterator(fieldValue, source))
  }

  return (
    <>
      <h3>{title}</h3>
      <Box
        className="input-holder"
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        autoComplete="off"
        onSubmit={e => handleSubmit(e)}>
        <TextField
          label={label}
          variant="filled"
          value={fieldValue}
          onInput={e => setFieldValue(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Transliterate
        </Button>
      </Box>
    </>
  )
}

export default Input
