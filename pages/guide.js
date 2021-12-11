// components
import Box from '@mui/material/Box'
import LinkNext from 'next/link'
import Typography from '@mui/material/Typography'

export default function Guide() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h3" align="center" sx={{ m: '2rem', fontWeight: 'bold' }}>
        Guide
      </Typography>
      <Typography variant="body1" align="center">
        <a
          href="/downloads/beginners-guide-to-nuscript.pdf"
          alt="download nuscript guide"
          target="_blank"
          rel="noopener noreferrer"
          download>
          Download the Beginner’s Guide to Nuscript
        </a>
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: '2rem' }}>
        More info will be available later. For now, try out the{' '}
        <LinkNext href="/transliterate">Transliterator</LinkNext>.
      </Typography>
    </Box>
  )
}
