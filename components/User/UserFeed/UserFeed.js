import UserFeedPost from './UserFeedPost';
import UserFeedArtwork from './UserFeedArtwork';

const UserFeed = ({ owner, data, name, nickname, avatar, hash, type }) => {
  return <div className="user-feed">
    {
      data.map(item => {
        return item.type === "artwork" ?
          <UserFeedArtwork feedType={type} {...item} owner={owner} name={name} nickname={nickname} avatar={avatar} hash={hash} />
          :
          <UserFeedPost {...item} name={name} nickname={nickname} avatar={avatar} />
      })
    }
  </div>
}

export default UserFeed;
