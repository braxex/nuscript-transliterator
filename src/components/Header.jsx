import { useState } from 'react'
import Image from 'next/image'
import LinkNext from 'next/link'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
// components
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
// images & icons
import logo from '../assets/images/ns-logo.png'
import MenuIcon from '@mui/icons-material/Menu'

const menuRoutes = [
  {
    route: '/transliterate',
    text: 'Transliterate',
  },
  {
    route: '/guide',
    text: 'Guide',
  },
  {
    route: '/about',
    text: 'About',
  },
]

const styles = {
  button: {
    margin: 0,
    borderRadius: 0,
    borderBottom: '3px solid transparent',
    fontWeight: 'bold',
    color: 'white',
    transition: 'all 0.2s ease',
    ':hover': {
      borderBottom: '3px solid white',
    },
  },
}

const MenuLink = ({ href, text }) => (
  <LinkNext href={href} passHref>
    <Button variant="text" sx={{ ...styles.button }}>
      {text}
    </Button>
  </LinkNext>
)

const DesktopMenu = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ maxWidth: 1140 }}>
      {menuRoutes.map(item => {
        const { route, text } = item
        return <MenuLink key={route} href={route} text={text} />
      })}
    </Stack>
  )
}

const MobileMenu = () => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '& .MuiPopover-paper': {
            background: theme.palette.primary.main,
          },
        }}>
        {menuRoutes.map(item => {
          const { route, text } = item
          return (
            <MenuItem onClick={handleClose}>
              <MenuLink key={route} href={route} text={text} />
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default function Header() {
  const theme = useTheme()
  const { palette, breakpoints } = theme
  const desktop = useMediaQuery(breakpoints.up('lg'))
  return (
    <Box
      sx={{
        width: '100%',
        background: palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{
            background: palette.primary.main,
            maxWidth: '1140px',
            width: '100%',
            display: 'flex',
            justifyContent: desktop ? 'start' : 'space-between',
            alignSelf: 'center',
            padding: '0px !important',
          }}>
          <LinkNext href="/">
            <a
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '2px',
                cursor: 'pointer',
              }}>
              <Image src={logo} alt="logo" width={60} height={60} layout="fixed" />
            </a>
          </LinkNext>
          {desktop ? <DesktopMenu /> : <MobileMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
