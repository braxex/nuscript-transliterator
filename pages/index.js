import { useState } from 'react'
// components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// utils
import transliterator from '../utils/transliterator'

const FormInput = ({ title, label, source }) => {
  const [fieldValue, setFieldValue] = useState('')
  const [response, setResponse] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    setResponse(transliterator(fieldValue, source))
  }

  return (
    <>
      <h3>{title}</h3>
      <Box
        className="input-holder"
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        autoComplete="off"
        onSubmit={e => handleSubmit(e)}>
        <TextField
          label={label}
          variant="filled"
          value={fieldValue}
          onInput={e => setFieldValue(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Transliterate
        </Button>
        {/* <p>{response}</p> */}
      </Box>
    </>
  )
}

const Homepage = () => {
  return (
    <div className="container">
      <main>
        <h1 className="title">Nuskript Transliterator</h1>
        <FormInput title="English to Nuskrîpt" label="English" source="eng" />
        <FormInput title="IPA to Nuskrîpt" label="IPA" source="ipa" />
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
          margin-bottom: 3rem;
        }
      `}</style>
    </div>
  )
}

export default Homepage
