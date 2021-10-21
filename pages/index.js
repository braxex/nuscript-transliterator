// components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const getRedisEntry = async (e, word) => {
  e.preventDefault()

  const response = await fetch(`/api/redis/get-entry?word=${word}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const fetchedResponse = await response.json()
  const parsedResponse = await JSON.parse(fetchedResponse.response)
  console.log('redis get entry response:\n', parsedResponse)
  return parsedResponse
}

const setRedisEntry = async (e, word, wordData) => {
  e.preventDefault()

  const response = await fetch(`/api/redis/set-entry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: word, apiResponse: wordData }),
  })

  const parsedResponse = await response.json()
  console.log('redis set entry response:\n', parsedResponse)
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
            onClick={e => getRedisEntry(e, 'testd')}
            sx={{ width: 175, height: '100%' }}>
            GET
          </Button>
          <Button
            variant="contained"
            onClick={e => setRedisEntry(e, 'testd', { key1: 'val1d', key2: 'val2d' })}
            sx={{ width: 175, height: '100%' }}>
            SET
          </Button>
        </Stack>
      </Box>
    </>
  )
}
