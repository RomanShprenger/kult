import GridItem from './GridItem';

function Grid({ posts }) {
  return <div className="grid">
    {
      posts.map((item, i) => (
        <GridItem type={item.type} size={item.size} data={item.data} index={item.index} key={i} />
      ))
    }
    </div>
}

export default Grid;
