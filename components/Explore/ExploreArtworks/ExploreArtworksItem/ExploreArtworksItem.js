import { useState } from "react";
import ExploreDragHelper from 'components/Explore/ExploreDragHelper';
import Link from 'next/link';

const ExploreArtworksItem = ({ author, post, showHelper }) => {
  const [follow, setFollow] = useState(false);

  const action = (nick) => {
    console.log(nick);
    setFollow(true);
  }

  return (
    <div className="explore__artworks-item">
      <div className="explore__artworks-item-header">
        <Link href={`/artwork/${post.slug}`}>
          <a className="explore__artworks-item-avatar">
            <img src={author.avatar} alt={author.name} />
          </a>
        </Link>

        <div className="explore__artworks-item-user">
          <Link href={`/artwork/${post.slug}`}>
            <a className="explore__artworks-item-name">{author.name}</a>
          </Link>
          <div className="explore__artworks-item-artworks">{author.artworks} Artworks</div>
        </div>

        <button className={`explore__artworks-item-btn ${follow ? 'explore__artworks-item-btn--following' : ''}`} onClick={() => action(author.nick)}>{follow ? <i className="icon icon-done"></i> : 'Follow'}</button>
      </div>
      <div className="explore__artworks-item-body">
        <Link href={`/artwork/${post.slug}`}>
          <a className="explore__artworks-item-link" style={{
            backgroundImage: `url(${post.image})`
          }}>
            <img src={post.image} alt={post.slug} />
          </a>
        </Link>
      </div>
      {showHelper && <ExploreDragHelper className="explore__artworks-item-drag" />}
    </div>
  )
}

export default ExploreArtworksItem;
