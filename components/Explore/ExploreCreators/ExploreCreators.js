import Link from 'next/link';

const ExploreCreators = ({ label, list }) => {
  return (
    <div className="explore__creators">
      <div className="container">
        {label}
        <ul className="explore__creators-list">
          {
            list.map((item, i) => (
              <li key={item.nick + i} className="explore__creators-item">
                {i !== 0 && i !== (list.length - 1) && <span className="explore__creators-comma">,</span>}
                <Link href={`/user/${item.nick}`}>
                  <a className="explore__creators-link">
                    {item.name}
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default ExploreCreators;
