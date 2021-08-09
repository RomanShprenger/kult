import moment from 'moment';
import Dropdown from "components/Dropdown";

const Profile = ({ type, followHandler, avatar, verified, owner, follower, nickname, name, hash, description, created, stats, socials }) => {
  const links = [];
  const handler = (e) => {
    e.preventDefault();
    followHandler(e);
  }

  if (!owner) {
    links.push(<a href="#" className="profile__links-item profile__links-item--follow" key="follow" onClick={handler}>{ follower ? "Unfollow" : "Follow" }</a>)
  }

  socials.forEach(el => links.push(<a href={el.link} target="_blank" className="profile__links-item" key={el.name}>{el.name}</a>));

  if (links.length > 3) {
    const hidden = links.slice(3);
    const dropdown = <Dropdown list={hidden} title={<i className="icon icon-more"></i>} classList="profile__links-item profile__links-item--more" key="more" />
    links.splice(3, links.length, dropdown);
  }

  return <div className={`profile profile--${type}`}>
    <div className="profile__avatar">
      <div className="profile__avatar-img">
        <img src={avatar} alt="User avatar" />
      </div>
      {
        verified && <div className="profile__avatar-verified"><i className="icon icon-diamond"></i></div>
      }
    </div>
    <div className="profile__links">
      { links.map(el => el) }
    </div>
    <div className="profile__name">{name}</div>
    <div className="profile__ids">
      <div className="profile__ids-nickname"><span className="profile__ids-nickname-at">@</span> {nickname}</div>
      <button className="profile__ids-hash" onClick={() => console.log("Copy")}><i className="icon icon-open"></i> {hash}</button>
    </div>
    <div className="profile__stats">
      <div className="profile__stats-item">
        <div className="profile__stats-value">{stats.posts}</div>
        <div className="profile__stats-param">Posts</div>
      </div>
      <div className="profile__stats-item">
        <div className="profile__stats-value">{stats.followers}</div>
        <div className="profile__stats-param">Followers</div>
      </div>
      <div className="profile__stats-item">
        <div className="profile__stats-value">{stats.following}</div>
        <div className="profile__stats-param">Following</div>
      </div>
    </div>
    <div className="profile__description">{description}</div>
    <div className="profile__created">Joined {moment(created).format("MMMM YYYY")}</div>
  </div>
}

export default Profile;
