import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import Footer from '../components/Footer'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <header style={{margin: 'auto'}}>
            <div className='siimple-jumbotron-title' style={{fontSize: 70, color: 'darkgray', margin: '20px'}}>title</div>
          </header>
          <Main />
          <NextScript />
        </body>
        <Footer />
      </Html>
    )
  }
}
