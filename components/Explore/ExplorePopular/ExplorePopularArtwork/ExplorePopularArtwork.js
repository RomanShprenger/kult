import Link from 'next/link';

const ExplorePopularArtwork = ({ post }) => (
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
  </div>
)

export default ExplorePopularArtwork;
