import { useState } from "react";
import Slider from 'components/Slider';
import Grid from 'components/Grid';

import sliderData from 'data/slider.json'
import gridData from 'data/grid.json'

function HomePage() {
  const [ dark, setDark ] = useState(false);
  const gridItemHover = (status) => {
    const { innerWidth: width } = window;
    if (width >= 1280) {
      setDark(status);
    } else {
      setDark(false);  
    }
  }

  const { data } = sliderData;
  const { posts } = gridData;

  return <div className={`home ${dark ? "dark" : ''}`}>
    <div className="home__slider">
      <Slider data={data} />
    </div>
    <div className="home__grid">
      <Grid posts={posts} hoverAction={gridItemHover} />
    </div>
  </div>
}

export default HomePage
