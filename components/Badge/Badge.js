import Link from 'next/link';

const Badge = ({ imgUrl = '', nick = '', hash = '', text = '', bid = "", type = ''}) => {
  switch (type) {
    case "heading-nick":
      return (
        <Link href={`/${{nick}}`}>
          <a className="badge badge--heading-nick">
            <span className="badge__photo">
              <img src={imgUrl} alt="author photo" />
            </span>
            <span className="badge__text">
              <span className="badge__heading">{text}</span>
              <span className="badge__nickname"><span className="at">@</span>{nick}</span>
            </span>
          </a>
        </Link>
      )
    case "nick-hash":
      return (
        <Link href={`/${{nick}}`}>
          <a className="badge badge--nick-hash">
            <span className="badge__photo">
              <img src={imgUrl} alt="author photo" />
            </span>
            <span className="badge__text">
              <span className="badge__nickname"><span className="at">@</span>{nick}</span>
              <span className="badge__hash">{hash}</span>
            </span>
          </a>
        </Link>
      )
    case "hash-bid":
      return (
        <Link href={`/${{nick}}`}>
          <a className="badge badge--hash-bid">
            <span className="badge__photo">
              <img src={imgUrl} alt="author photo" />
            </span>
            <span className="badge__text">
              <span className="badge__hash"><span className="at">@</span>{hash}</span>
              <span className="badge__bid">{bid}</span>
            </span>
          </a>
        </Link>
      )
    default:
      return '';
  }

}

export default Badge;
