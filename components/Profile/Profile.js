import moment from 'moment';
import ContentEditable from 'react-contenteditable'
import Dropdown from "components/Dropdown";
import copyClipboard from 'utils/copyClipboard';
import {useDropzone} from 'react-dropzone';
import { useState, useRef } from 'react';

const Profile = ({ type, followHandler, avatar, verified, owner = false, follower, nickname, name, hash, description, created, stats, socials = [], editable = false, dispatchChanges }) => {
  let links = [];
  let shownLinks = [];
  let hiddenLinks = [];

  const contentEditable = useRef(null);
  let desc = {html: description};

  const {getRootProps, getInputProps} = useDropzone({
     accept: 'image/*',
     maxFiles: 1,
     multiple: false,
     noDragEventsBubbling: true,
     onDrop: (acceptedFiles, fileRejections, event) => {
       const newImage = acceptedFiles.pop();
       dispatchChanges({ type: "AVATAR", value: {
         file: newImage,
         preview: URL.createObjectURL(newImage),
       } });
     }
   });

  const handler = (e) => {
    e.preventDefault();
    followHandler(e);
  }

  const copy = (text) => {
    copyClipboard(text, () => console.log("Copied"));
  }

  const changeDescription = () => {
    contentEditable.current.focus();
  }

  !owner && links.push(<a href="#" className="profile__links-item profile__links-item--follow" key="follow" onClick={handler}>{ follower ? "Unfollow" : "Follow" }</a>);

  if (!owner && socials.length >= 2) {
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
      { editable && <div className="profile__top-edit">Edit</div> }
      <div className="profile__avatar" onClick={e => e.stopPropagation()}>
        <div {...getRootProps({className: 'user__dropzone user__dropzone-avatar'})}>
          { editable && (
            <>
              <input {...getInputProps()} />
              <div className="profile__avatar-edit">Edit</div>
            </>
          )}
          <div className="profile__avatar-img" style={{
            backgroundImage: `url(${avatar.preview})`
          }}>
            <img src={avatar.preview} alt="User avatar" />
          </div>
          {
            verified && <div className="profile__avatar-verified"><i className="icon icon-diamond"></i> Verified Artist</div>
          }
        </div>
      </div>
      <div className="profile__links">
        { links.map(el => el) }
      </div>
      <div className="profile__name">{name}</div>
    </div>
    <div className="profile__middle">
      <div className="profile__ids">
        <div className="profile__ids-nickname"><span className="profile__ids-nickname-at">@</span> {nickname}</div>
        <button type="button" className="profile__ids-hash" onClick={() => copy(hash)}><i className="icon icon-open"></i> {hash}</button>
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
    {
      type !== 'demo' && <div className="profile__bottom" onClick={event => event.stopPropagation()}>
        { editable && <div className="profile__bottom-edit" onClick={changeDescription}>Edit</div> }
        <ContentEditable
          className="profile__description"
          innerRef={contentEditable}
          html={desc.html}
          disabled={!editable}
          onChange={(evt) => dispatchChanges({
            type: "DESCRIPTION",
            value: evt.target.value
          })}
        />
        <div className="profile__created">Joined {moment(created).format("MMMM YYYY")}</div>
      </div>
    }
  </div>
}

export default Profile;
