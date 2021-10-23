import Image from 'next/image'
import LinkNext from 'next/link'
// components
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
// images
import logo from '../assets/images/ns-logo.png'

const HeaderLink = ({ href, text }) => {
  return (
    <LinkNext href={href} passHref>
      <Button
        variant="text"
        sx={{
          margin: 0,
          borderRadius: 0,
          borderBottom: '3px solid transparent',
          fontWeight: 'bold',
          color: 'white',
          transition: 'all 0.2s ease',
          ':hover': {
            borderBottom: '3px solid white',
          },
        }}>
        {text}
      </Button>
    </LinkNext>
  )
}

export default function Header() {
  const theme = useTheme()
  return (
    <Box sx={{ width: '100%', background: theme.palette.primary.main }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{
            width: '100%',
            background: theme.palette.primary.main,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ maxWidth: 1140 }}>
            <HeaderLink href="/ipa" text="Convert IPA" />
            <LinkNext href="/">
              <a
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '3px',
                  cursor: 'pointer',
                }}>
                <Image src={logo} alt="logo" width={50} height={40} layout="fixed" />
              </a>
            </LinkNext>
            <HeaderLink href="/english" text="Convert English" />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
