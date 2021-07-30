import Layout from "components/Layout";

import "styles/global.scss";
import "styles/Icon.scss";
import "styles/Badge.scss";
import "styles/BidList.scss";
import "styles/Header.scss";
import "styles/Home.scss";
import "styles/Slider.scss";
import "styles/Grid.scss";
import "styles/Artwork.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
