import Link from 'next/link';
import moment from 'moment';

const UserGridItem = ({ type, imageUrl, slug, title, text, name, date, avatar }) => {
  return <div className={`user-grid-item user-grid-item--${type}`}>
    <Link href={`/${type}/${slug}`}>
      <a className="user-grid-item__link">
        <span className="user-grid-item__content">
          { type === "artwork" && <img className="user-grid-item__img" src={imageUrl} alt={title} /> }
          {
            type === "post" && <>
              <span className="user-grid-item__author">
                <img src={avatar} alt="User avatar" className="user-grid-item__author-img"/>
                <span className="user-grid-item__author-name">{name}</span>
              </span>
              <span className="user-grid-item__text">{text}</span>
            </>
          }
          { type === "post" && date && <span className="user-grid-item__date">{moment(date).format("DD MMM")}</span> }
        </span>
      </a>
    </Link>
  </div>
}

export default UserGridItem;
