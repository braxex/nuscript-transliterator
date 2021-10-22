import { useState } from 'react'
// components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Input from '../src/components/Input'
// handler
import engHandler from '../src/utils/eng-utils'
import parHandler from '../src/utils/par-utils'

export default function EnglishTransliterator() {
  const [response, setResponse] = useState(null)
  return (
    <>
      <Typography variant="h3" align="center" sx={{ m: '2rem', fontWeight: 'bold' }}>
        English to Nuskrîpt
      </Typography>
      <Input label="English" handler={parHandler} setResponse={setResponse} />
      <Box sx={{ m: '2rem', mx: '6rem' }}>
        {!!response && !response.success && (
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
            Sorry, word not found. Try again.
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
              {response.nuskript || 'Word pronunciation not available. Transliterate manually.'}
            </Typography>
            {response.pronunciation && (
              <Typography variant="h6" align="center" gutterBottom>
                IPA: {response.pronunciation.all || response.pronunciation}
              </Typography>
            )}
          </>
        )}
      </Box>
    </>
  )
}
