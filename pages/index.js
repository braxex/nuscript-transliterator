// components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { getRedisEntry, setRedisEntry } from '../src/utils/redis-utils'

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
    </>
  )
}
