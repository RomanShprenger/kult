import Link from 'next/link';
import alphabet from 'data/alphabet.json';

const ExploreAlphabet = () => {
  return (
    <div className="explore__alphabet-wrapper">
      <div className="container">
        <ul className="explore__alphabet">
          {
            Object.keys(alphabet).map((letter) => {
              return alphabet[letter].map((creator, i) => (
                <li className="explore__alphabet-item" {...{ "data-letter": i === 0 ? letter.toUpperCase() : null}} key={creator.nick+i}>
                  <Link href={`/user/${creator.nick}`}>
                    <a className="explore__alphabet-item-link">
                      {creator.name}
                    </a>
                  </Link>
                </li>
              ))
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default ExploreAlphabet;
