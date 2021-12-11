// components
import Box from '@mui/material/Box'
import LinkNext from 'next/link'
import Typography from '@mui/material/Typography'

export default function Homepage() {
  return (
    <Box sx={{ m: '2rem', width: '100%', maxWidth: 800 }}>
      <Typography variant="h3" align="center" sx={{ m: '2rem', fontWeight: 'bold' }}>
        Nuscrîpt Transliterator
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Welcome to the Nuscrîpt Transliterator!
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: '2rem' }}>
        Nuscrîpt is an alternative English orthography; a new system of writing words that removes
        irregularity and uncertainty by enforcing a nearly one-to-one relationship between sounds
        and letters.
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: '2rem' }}>
        More info will be available later. For now, download the{' '}
        <LinkNext href="/guide">guide</LinkNext> or try out the{' '}
        <LinkNext href="/transliterate">Transliterator</LinkNext>.
      </Typography>
    </Box>
  )
}
