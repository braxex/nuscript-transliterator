import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
// theming
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// components
import Box from '@mui/material/Box'
import Header from '../src/components/Header'

const theme = createTheme({
  palette: {
    primary: { main: '#000' },
  },
})

const App = props => {
  const { Component, pageProps } = props
  return (
    <>
      <Head>
        <title>Nuscrîpt Transliterator</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Header />
          <Box sx={{ display: 'flex', justifyContent: 'center', maxWidth: 1140, minWidth: 800 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Box sx={{ maxWidth: 1140, minWidth: 800 }}>
                <Component {...pageProps} />
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
