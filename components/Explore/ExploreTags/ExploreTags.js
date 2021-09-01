import Link from 'next/link';

const ExploreTags = ({ label, tags }) => (
  <div className="container">
    <div className="explore__tags">
      <div className="explore__tags-col">
        <div className="explore__tags-title">Explore by tags</div>
        {label}
      </div>
      <div className="explore__tags-col">
        <div className="explore__tags-subtitle">Explore artist by tags</div>
        <div className="explore__tags-list">
          {
            tags.map(tag => (
              <Link href={`/explore?tag=${tag}`} key={tag}>
                <a className="explore__tags-link">#{tag}</a>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  </div>
)

export default ExploreTags;
