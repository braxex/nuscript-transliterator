import { createTheme } from '@mui/material/styles'

let theme = createTheme({
  palette: {
    primary: { main: '#0b0b0b' },
  },
  breakpoints: {
    values: {
      sm: 0,
      md: 600,
      lg: 960,
      xl: 1280,
    },
  },
})

theme = createTheme(theme, {
  typography: {
    h3: {
      fontSize: '2.4rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1.8rem',
      },
    },
  },
})

const createdTheme = theme

export default createdTheme
