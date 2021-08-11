import UserFeedPost from './UserFeedPost';
import UserFeedArtwork from './UserFeedArtwork';

const UserFeed = ({ owner, data, name, nickname, avatar }) => {
  return <div className="user-feed">
    {
      data.map(item => {
        return item.type === "artwork" ?
          <UserFeedArtwork {...item} owner={owner} name={name} nickname={nickname} avatar={avatar} />
          :
          <UserFeedPost {...item} name={name} nickname={nickname} avatar={avatar} />
      })
    }
  </div>
}

export default UserFeed;
