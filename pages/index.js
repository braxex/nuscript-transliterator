import Link from 'next/link'
// components
import Header from '../components/Header'

export default () => (
  <div className="container">
    <Header current="/" />
    <main>
      <h1 className="title">
        <Link href="/">
          <a className="homepage-link">Nuskrîpt Transliterator</a>
        </Link>
      </h1>
      <p style={{ textAlign: 'center' }}>Welcome to the Nuskrîpt Transliterator!</p>
      <p style={{ textAlign: 'center' }}>There will be more information here later.</p>
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
    `}</style>
  </div>
)
