import { useState } from "react";
import { ExploreArtworks, ExploreTags, ExplorePopular, ExploreCreators } from "components/Explore";
import exploreData from 'data/explore.json';

function Explore({ creators, posts, popular, tags }) {
  const [showCreators, showCreatorsToggle] = useState(false);

  const label = (<div className="explore__artists">Browse over <span className="primary">{creators.count} Artists</span></div>);

  return <div className="explore">
    {/* Explore form */}
    {/* Creator short list (те, на кого не подписан) */}
    <ExploreCreators label={label} list={creators.list} />
    {/* Artworks */}
    <ExploreArtworks posts={posts} />
    {/* Popular */}
    <ExplorePopular label={label} popular={popular} />
    {/* Explore tags */}
    <ExploreTags label={label} tags={tags} />
  </div>
}


export async function getServerSideProps() {
  // TODO: тут будем запрашивать данные с сервера и передавать в компонент
  // const res = await fetch(`https://...`)
  // const data = await res.json()
  const data = exploreData;

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...data
    },
  }
}

export default Explore
