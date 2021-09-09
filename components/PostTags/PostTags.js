import Link from 'next/link';

const PostTags = ({ categories, unlockable }) => {
  return <div className="post-tags">
    {
      unlockable.status && <Link href={`/explore?tag=unlockable`}>
        <a className="post-tags__item post-tags__item--unlockable">
          <i className="icon icon-diamond"></i>Unlockable content
        </a>
      </Link>
    }
    {
      categories.map(item => <Link href={`/explore?tag=${item}`} key={item}>
        <a className="post-tags__item">{item}</a>
      </Link>)
    }
  </div>
}

export default PostTags;
