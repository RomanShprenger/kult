const PostHeader = ({ avatar, name, nickname, date }) => {
  return <div className="post-header">
    <div className="post-header__img">
      <img src={avatar} alt="User avatar" />
    </div>
    <div className="post-header__info">
      <div className="post-header__name">{name}</div>
      <div className="post-header__info-footer">
        <div className="post-header__nickname">@{nickname}</div>
        { date && <div className="post-header__date">{date}</div> }
      </div>
    </div>
  </div>
}

export default PostHeader;
