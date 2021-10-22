import { useState } from 'react'
// components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import Input from '../src/components/Input'
// handler
import engHandler from '../src/utils/eng-utils'
import parHandler from '../src/utils/par-utils'

export default function EnglishTransliterator() {
  const [response, setResponse] = useState(null)
  const [variant, setVariant] = useState('longform')

  const handleVariant = (e, newVariant) => {
    setVariant(newVariant)
    setResponse(null)
  }

  return (
    <>
      <Typography variant="h3" align="center" sx={{ m: '2rem', fontWeight: 'bold' }}>
        English to Nuskrîpt
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ maxWidth: 1140, marginBottom: '2rem' }}>
        <ToggleButtonGroup value={variant} exclusive onChange={handleVariant}>
          <ToggleButton sx={{ width: 150 }} value="single">
            Single
          </ToggleButton>
          <ToggleButton sx={{ width: 150 }} value="longform">
            Longform
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Input
        label={variant === 'longform' ? 'English (lots)' : 'English (single word)'}
        handler={variant === 'longform' ? parHandler : engHandler}
        setResponse={setResponse}
        longform={variant === 'longform'}
      />
      <Box sx={{ m: '2rem', mx: '6rem' }}>
        {!!response && !response.success && (
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
            Sorry, word not found. Transliterate manually or try again.
          </Typography>
        )}
        {!!response && response.success && (
          <>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', marginTop: '2rem' }}>
              Nuskrîpt:{' '}
              {response.nuskript ||
                'Sorry, word pronunciation not available. Transliterate manually or try again.'}
            </Typography>
            {response.pronunciation && (
              <Typography variant="h6" align="center" gutterBottom>
                IPA: {response.pronunciation.all || response.pronunciation}
              </Typography>
            )}
            {response.word && (
              <Typography variant="h6" align="center" gutterBottom>
                Original: {response.word}
              </Typography>
            )}
          </>
        )}
      </Box>
    </>
  )
}
