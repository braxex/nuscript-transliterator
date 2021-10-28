// components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function About() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h3" align="center" sx={{ m: '2rem', fontWeight: 'bold' }}>
        About
      </Typography>
      <Typography variant="body1" align="center">
        There will be more information here later.
      </Typography>
    </Box>
  )
}
