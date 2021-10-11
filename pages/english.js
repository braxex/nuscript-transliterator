import { useState } from 'react'
// components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Input from '../src/components/Input'

export default function EnglishTransliterator() {
  const [response, setResponse] = useState(null)
  return (
    <>
      <Typography variant="h3" align="center" sx={{ m: '2rem', fontWeight: 'bold' }}>
        English to Nuskrîpt
      </Typography>
      <Input label="English" source="eng" setResponse={setResponse} />
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
            <Typography variant="h6" align="center" gutterBottom sx={{ marginTop: '2rem' }}>
              Defintions
            </Typography>
            <Box sx={{ mx: '3rem', borderTop: '2px solid black', paddingTop: '1rem' }}>
              <ol>
                {response.results.map(entry => (
                  <li key={entry.definition}>
                    <i>{`${entry.partOfSpeech}`}</i>
                    {`. ${entry.definition}. `}
                    {entry.synonyms && `(syn: ${entry.synonyms.join(', ')})`}
                  </li>
                ))}
              </ol>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
