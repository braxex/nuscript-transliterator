import { useState } from 'react'
// components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
// utils
import transliterator from '../utils/transliterator'

export default function Input({ label, source, setResponse }) {
  const [fieldValue, setFieldValue] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setResponse(await transliterator(fieldValue, source))
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={e => handleSubmit(e)}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
      }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ maxWidth: 1140 }}>
        <TextField
          label={label}
          variant="filled"
          value={fieldValue}
          onInput={e => setFieldValue(e.target.value)}
          sx={{ width: 250 }}
        />
        <Button variant="contained" type="submit" sx={{ width: 175, height: '100%' }}>
          Transliterate
        </Button>
      </Stack>
    </Box>
  )
}
