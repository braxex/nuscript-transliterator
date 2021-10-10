import { useState } from 'react'
import Link from 'next/link'
// components
import Header from '../components/Header'
import Input from '../components/Input'

export default () => {
  const [response, setResponse] = useState(null)
  return (
    <div className="container">
      <Header current="/ipa" />
      <main>
        <h1 className="title">
          <Link href="/">
            <a className="homepage-link">Nuskrîpt Transliterator</a>
          </Link>
        </h1>
        <div className="response-holder">
          <Input title="IPA to Nuskrîpt" label="IPA" source="ipa" setResponse={setResponse} />
          {response && (
            <div>
              <strong>
                <p>Nuskrîpt: {response.nuskript}</p>
              </strong>
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
