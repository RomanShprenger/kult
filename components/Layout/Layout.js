import Head from 'next/head';
import Header from 'components/Header';

export default function Layout({ children }) {
  return <div className="layout">
    <Head>
      <title>Kult</title>
      <meta name="description" content="Awesome kult" />
    </Head>
      <Header />
      {children}
  </div>
}
