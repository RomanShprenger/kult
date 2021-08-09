import Head from 'next/head';
import { useEffect } from "react";
import { mobileDetect } from 'utils/windowProperties'
import Header from 'components/Header';

export default function Layout({ children }) {
  useEffect(() => {
    if (mobileDetect()) {
      document.querySelector("body").classList.add("touch")
    }
  });

  return <div className="layout">
    <Head>
      <title>Kult</title>
      <meta name="description" content="Awesome kult" />
    </Head>
      <Header />
      {children}
  </div>
}
