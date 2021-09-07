import Link from 'next/link';
import ExploreDragHelper from 'components/Explore/ExploreDragHelper';

const ExplorePopularArtwork = ({ post, showHelper }) => (
  <div className="explore__popular-artwork">
    <Link href={`/artwork/${post.slug}`}>
      <a className="explore__popular-artwork-link">
        <span className="explore__popular-artwork-image" style={{
          backgroundImage: `url(${post.image})`
        }}>
          <img src={post.image} alt={post.name} />
        </span>
        <span className="explore__popular-artwork-name">{post.name}</span>
        <span className="explore__popular-artwork-price">{post.price} ETH</span>
      </a>
    </Link>
    {showHelper && <ExploreDragHelper className="explore__popular-artwork-drag" />}
  </div>
)

export default ExplorePopularArtwork;
