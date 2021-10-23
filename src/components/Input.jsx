// components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

export default function Input({
  fieldValue,
  setFieldValue,
  handler,
  setResponse,
  label,
  longform,
}) {
  const handleSubmit = async e => {
    e.preventDefault()
    setResponse(await handler(fieldValue))
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
      <Stack
        direction={longform ? 'column' : 'row'}
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ maxWidth: 1140 }}>
        <TextField
          label={label}
          variant="filled"
          value={fieldValue}
          onInput={e => setFieldValue(e.target.value)}
          sx={{ width: longform ? 500 : 250 }}
          multiline={longform}
          rows={longform ? 6 : 1}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ width: 175, height: '100%', minHeight: 56 }}>
          Transliterate
        </Button>
      </Stack>
    </Box>
  )
}
