import Slider from 'components/Slider';
import Grid from 'components/Grid';

import sliderData from 'data/slider.json'
import gridData from 'data/grid.json'

function HomePage() {
  const { data } = sliderData;
  const { posts } = gridData;

  return <div className="home">
    <div className="home__slider">
      <Slider data={data} />
    </div>
    <div className="home__grid">
      <Grid posts={posts} />
    </div>
  </div>
}

export default HomePage
