const PostActions = ({ type, cbLike, cbShare, cbComment, liked }) => {
  return <div className="post-actions">
    <button className={`post-actions__item post-actions__item--like ${liked ? "post-actions__item--liked" : ""}`} onClick={cbLike}>
      <i className="icon icon-like"></i>
    </button>
    <button className="post-actions__item post-actions__item--comment" onClick={cbComment}>
      <i className="icon icon-comment"></i>
    </button>
    <button className="post-actions__item post-actions__item--share" onClick={cbShare}>
      <i className="icon icon-share"></i>
    </button>
  </div>
}

export default PostActions;
