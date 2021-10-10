import { useState } from 'react'
import Link from 'next/link'
// components
import Header from '../components/Header'
import Input from '../components/Input'

export default () => {
  const [response, setResponse] = useState(null)
  return (
    <div className="container">
      <Header current="english" />
      <main>
        <h1 className="title">
          <Link href="/">
            <a className="homepage-link">Nuskrîpt Transliterator</a>
          </Link>
        </h1>
        <div className="response-holder">
          <Input
            title="English to Nuskrîpt"
            label="English"
            source="eng"
            setResponse={setResponse}
          />
          {!!response && !response.success && (
            <>
              <p>Sorry, word not found. Try again.</p>
            </>
          )}
          {!!response && response.success && (
            <div>
              <strong>
                <p>
                  Nuskrîpt:{' '}
                  {response.nuskript || 'Word pronunciation not available. Transliterate manually.'}
                </p>
              </strong>
              {response.pronunciation && (
                <p>IPA: {response.pronunciation.all || response.pronunciation}</p>
              )}
              <p>Defintions:</p>
              <ol>
                {response.results.map(entry => (
                  <li key={entry.definition}>
                    <span>
                      <i>{`${entry.partOfSpeech}`}</i>
                    </span>
                    <span>{`. ${entry.definition}. `}</span>
                    <span>{entry.synonyms && `(syn: ${entry.synonyms.join(', ')})`}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          width: 1140px;
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
        .homepage-link {
          text-decoration: none;
          color: black;
        }
        .response-holder {
          margin-left: 20%;
          width: 80%;
        }
      `}</style>
    </div>
  )
}
