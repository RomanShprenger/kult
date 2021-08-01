import Badge from 'components/Badge';

const Info = ({ creator, title, description, unlockable, tags, categories }) => {
  return <div className="info">
    <div className="info__badge">
      <Badge type="nick-hash" nick={creator.nickname} imgUrl={creator.photo} hash={creator.hash} />
    </div>
    <div className="info__title">{title}</div>
    <ul className="info__categroies">
      { unlockable.status ? <li className="info__categroies-item info__categroies-item--unlockable"><img src="/icons/diamond.svg" alt="unlicable category"/> Unlockable content</li> : null}
      { categories.map(cat => <li className="info__categroies-item" key={cat}>{cat}</li>) }
    </ul>
    <div className="info__description">{description}</div>
    {
      unlockable.status ? (
        <div className="info__unlockable">
          <div className="info__unlockable-icon">
            <img src="/icons/diamond.svg" alt="unlicable icon"/>
          </div>
          <div className="info__unlockable-title">Unlockable contnet</div>
          <div className="info__unlockable-text" dangerouslySetInnerHTML={{__html: unlockable.content}}></div>
        </div>
      ): null
    }
    <div className="info__tags">{tags.map(tag => `#${tag} `)}</div>
  </div>
}

export default Info;
