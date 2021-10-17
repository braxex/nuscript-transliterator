// components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const getWord = async (e, word) => {
  e.preventDefault()

  const response = await fetch(`/api/getword?word=${word}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const fetchedResponse = await response.json()
  const parsedResponse = await JSON.parse(fetchedResponse.response)
  return parsedResponse
}

const setWord = async (e, word, wordData) => {
  e.preventDefault()

  const response = await fetch(`/api/setword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: word, apiResponse: wordData }),
  })

  const parsedResponse = await response.json()
  return parsedResponse
}

export default function Homepage() {
  return (
    <>
      <Typography variant="h3" align="center" sx={{ m: '2rem', fontWeight: 'bold' }}>
        Nuskrîpt Transliterator
      </Typography>
      <Typography variant="body1" align="center">
        Welcome to the Nuskrîpt Transliterator!
      </Typography>
      <Typography variant="body1" align="center">
        There will be more information here later.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ maxWidth: 1140 }}>
          <Button
            variant="contained"
            onClick={e => getWord(e, 'testd')}
            sx={{ width: 175, height: '100%' }}>
            GET
          </Button>
          <Button
            variant="contained"
            onClick={e => setWord(e, 'testd', { key1: 'val1d', key2: 'val2d' })}
            sx={{ width: 175, height: '100%' }}>
            SET
          </Button>
        </Stack>
      </Box>
    </>
  )
}
