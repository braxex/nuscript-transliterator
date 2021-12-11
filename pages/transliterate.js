import { useState } from 'react'
// components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import Input from '../src/components/Input'
// handlers
import engHandler from '../src/utils/eng-utils'
import parHandler from '../src/utils/par-utils'

export default function EnglishTransliterator() {
  const [variant, setVariant] = useState('single')
  const [fieldValue, setFieldValue] = useState('')
  const [response, setResponse] = useState(null)

  const handleVariantChange = (e, newVariant) => {
    setVariant(newVariant)
    setFieldValue('')
    setResponse(null)
  }

  return (
    <>
      <Typography variant="h3" align="center" sx={{ m: '2rem', fontWeight: 'bold' }}>
        English to Nuscrîpt
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ maxWidth: 1140, marginBottom: '2rem' }}>
        <ToggleButtonGroup value={variant} exclusive onChange={handleVariantChange}>
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
        fieldValue={fieldValue}
        setFieldValue={setFieldValue}
      />
      <Box sx={{ m: '2rem', mx: '6rem' }}>
        {!!response && !response.success && (
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
            Sorry, word not found. Transliterate manually or try again.
          </Typography>
        )}
        {!!response && response.success && (
          <>
            {response.variant === 'longform' ? (
              <Box>
                {response.flags.invalid && (
                  <Typography variant="h6" gutterBottom sx={{ fontSize: 14 }}>
                    Your query includes{' '}
                    <span style={{ color: 'firebrick', fontWeight: 'bold' }}>invalid strings</span>:
                    words that could not be found in the dictionary. Common causes include typos and
                    unusual hyphenation.
                  </Typography>
                )}
                {response.flags.inexact && (
                  <Typography variant="h6" gutterBottom sx={{ fontSize: 14 }}>
                    Your response includes{' '}
                    <span style={{ color: 'goldenrod', fontWeight: 'bold' }}>
                      inexact transliterations
                    </span>
                    : words that could not be found in the dictionary, but for which a root word was
                    available. The root word has been translated instead and manual adjustment is
                    recommended. Common causes include uncommon verb forms and plurals.
                  </Typography>
                )}
                <Typography
                  variant="h5"
                  align="center"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    marginTop: '2rem',
                    '& > .inexact': { color: 'goldenrod' },
                    '& > .invalid': { color: 'firebrick' },
                  }}
                  dangerouslySetInnerHTML={{ __html: response.nuscript }}
                />
              </Box>
            ) : (
              <>
                <Typography
                  variant="h5"
                  align="center"
                  gutterBottom
                  sx={{ fontWeight: 'bold', marginTop: '2rem' }}>
                  Nuscrîpt:{' '}
                  {response.nuscript ||
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
          </>
        )}
      </Box>
    </>
  )
}
