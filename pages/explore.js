import { useState } from "react";
import { ExploreArtworks, ExploreTags, ExplorePopular, ExploreCreators } from "components/Explore";
import { FormExplore } from 'components/Forms';
import exploreData from 'data/explore.json';

function Explore({ creators, posts, popular, tags }) {
  const [showCreators, showCreatorsToggle] = useState(false);

  const request = (params) => {
    console.log(params);
  };

  const label = (<div className="explore__artists">Browse over <span className="primary">{creators.count} Artists</span></div>);

  return <div className="explore">
    {/* Explore form */}
    <FormExplore action={request} />
    {/* Creator short list (те, на кого не подписан) */}
    <ExploreCreators label={label} list={creators.list} />
    <div className="explore__toggle">
      <div className="container">
        {
          showCreators ? (
            <button className="explore__toggle-btn" onClick={() => showCreatorsToggle(false)}>Popular</button>
          ) : (
            <button className="explore__toggle-btn" onClick={() => showCreatorsToggle(true)}>Browse list</button>
          )
        }
      </div>
    </div>
    {
      showCreators ? (
        <></>
      ) : (
        <>
          {/* Artworks */}
          <ExploreArtworks posts={posts} />
          {/* Popular */}
          <div className="explore__title">
            <div className="container">
              <div className="explore__popular-title">Popular creators</div>
              {label}
            </div>
          </div>
          <div className="explore__popular">
            <div className="explore__popular-list">
              {
                popular.slice(0,2).map((item, i) => (
                  <ExplorePopular data={item} index={i} key={i} />
                ))
              }
            </div>
          </div>
          {/* Explore tags */}
          <ExploreTags label={label} tags={tags} />
          {/* Popular */}
          <div className="explore__popular">
            <div className="explore__popular-list">
              {
                popular.slice(2).map((item, i) => (
                  <ExplorePopular data={item} index={i + 2} key={i} />
                ))
              }
            </div>
          </div>
        </>
      )
    }
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
