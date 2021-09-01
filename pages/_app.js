import Layout from "components/Layout";

import "public/fonts/kulticons/style.scss";
import "styles/global.scss";
import "styles/Badge.scss";
import "styles/BidList.scss";
import "styles/Header.scss";
import "styles/Form.scss";
import "styles/Dropdown.scss";
import "styles/Modal.scss";
import "styles/PostActions.scss";
import "styles/PostHeader.scss";
import "styles/PostTags.scss";
import "styles/ImagePreview.scss";
import "styles/VideoPreview.scss";
import "styles/Slider.scss";
import "styles/Profile.scss";
import "styles/Grid.scss";
import "styles/Activity.scss";
import "styles/Info.scss";
import "styles/Owner.scss";
import "styles/ChainInfo.scss";

import "styles/Home.scss";
import "styles/User.scss";
import "styles/Connect.scss";
import "styles/Explore.scss";
import "styles/Artwork.scss";
import "styles/ArtworkNew.scss";
import "styles/Post.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
