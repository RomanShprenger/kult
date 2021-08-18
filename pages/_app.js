import Layout from "components/Layout";

import "public/fonts/kulticons/style.scss";
import "styles/global.scss";
import "styles/Badge.scss";
import "styles/BidList.scss";
import "styles/Header.scss";
import "styles/Dropdown.scss";
import "styles/PostActions.scss";
import "styles/PostHeader.scss";
import "styles/PostTags.scss";
import "styles/Slider.scss";
import "styles/Profile.scss";

import "styles/Home.scss";
import "styles/Grid.scss";
import "styles/User.scss";
import "styles/Connect.scss";
import "styles/Artwork.scss";
import "styles/Activity.scss";
import "styles/Info.scss";
import "styles/Owner.scss";
import "styles/ChainInfo.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
