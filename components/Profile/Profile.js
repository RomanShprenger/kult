import moment from 'moment';
import Dropdown from "components/Dropdown";
import copyClipboard from 'utils/copyClipboard';

const Profile = ({ type, followHandler, avatar, verified, owner, follower, nickname, name, hash, description, created, stats, socials, editable }) => {
  let links = [];
  let shownLinks = [];
  let hiddenLinks = [];
  const handler = (e) => {
    e.preventDefault();
    followHandler(e);
  }

  const copy = (text) => {
    copyClipboard(text, () => console.log("Copied"));
  }

  const changeAvatar = () => {
    console.log("Change avatar");
  }

  const changeBg = () => {
    console.log("Change background");
  }

  const changeDescription = () => {
    console.log("Change description");
  }

  if (!owner && socials.length >= 2) {
    links.push(<a href="#" className="profile__links-item profile__links-item--follow" key="follow" onClick={handler}>{ follower ? "Unfollow" : "Follow" }</a>)
    hiddenLinks = socials.slice(2, socials.length);
    shownLinks = shownLinks.concat(socials.slice(0, 2));
  } else if (socials.length >= 3) {
    hiddenLinks = socials.slice(3, socials.length);
    shownLinks = shownLinks.concat(socials.slice(0, 3));
  } else {
    shownLinks = shownLinks.concat(socials);
  }

  shownLinks.forEach(el => links.push(<a href={el.link} target="_blank" className="profile__links-item" key={el.name}>{el.name}</a>));

  if (hiddenLinks.length > 0) {
    const dropdown = <Dropdown list={hiddenLinks} title={<i className="icon icon-more"></i>} wrapperClasses="profile__links-dropdown" classList="profile__links-item profile__links-item--more" key="more" />
    links.push(dropdown);
  }

  return <div className={`profile profile--${type}`}>
    <div className="profile__top">
      { editable && <div className="profile__top-edit" onClick={changeBg}>Edit</div> }
      <div className="profile__avatar">
        { editable && <div className="profile__avatar-edit" onClick={changeAvatar}>Edit</div> }
        <div className="profile__avatar-img">
          <img src={avatar} alt="User avatar" />
        </div>
        {
          verified && <div className="profile__avatar-verified"><i className="icon icon-diamond"></i> Verified Artist</div>
        }
      </div>
      <div className="profile__links">
        { links.map(el => el) }
      </div>
      <div className="profile__name">{name}</div>
    </div>
    <div className="profile__middle">
      <div className="profile__ids">
        <div className="profile__ids-nickname"><span className="profile__ids-nickname-at">@</span> {nickname}</div>
        <button className="profile__ids-hash" onClick={() => copy(hash)}><i className="icon icon-open"></i> {hash}</button>
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
    </div>
    <div className="profile__bottom">
      { editable && <div className="profile__bottom-edit" onClick={changeDescription}>Edit</div> }
      <div className="profile__description">{description}</div>
      <div className="profile__created">Joined {moment(created).format("MMMM YYYY")}</div>
    </div>
  </div>
}

export default Profile;
