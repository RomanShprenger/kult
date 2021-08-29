import PostTags from 'components/PostTags';

const FormArtworkStepThree = ({ values }) => {
  const { owner, content, preview, title, price, description, tags, unlockStatus } = values;
  const file = content[0] ? (content[0].type.indexOf('image') >= 0 ? content[0] : preview[0]) : null;
  const imgUrl = file && URL.createObjectURL(file);
  return <>
    <div className="artwork-new__preview">
      <div className="artwork-new__preview-header">
        <div className="artwork-new__preview-header-photo">
          <img src={owner.avatar} alt="author photo"/>
        </div>
        <div className="artwork-new__preview-header-info">
          <div className="artwork-new__preview-header-owner">Owner</div>
          <div className="artwork-new__preview-header-hash"><span>@</span>{owner.hash}</div>
        </div>
      </div>
      <div className="artwork-new__preview-body">
        <div className="artwork-new__preview-body-img">
          {
            imgUrl ? <img src={imgUrl} alt="Artwork preview image" /> : <span>No image yet</span>
          }
        </div>
        <div className="artwork-new__preview-body-title">
          <div className="artwork-new__preview-body-name"><span>{title || 'Title'}</span></div>
          <div className="artwork-new__preview-body-price">{price.value ? `${price.value} ${price.currency}` : ''}</div>
        </div>
        <div className="artwork-new__preview-body-tags">
          <PostTags categories={tags} unlockable={{ status: unlockStatus }} />
        </div>
        <div className="artwork-new__preview-body-description">{description}</div>
      </div>
    </div>
  </>
}

export default FormArtworkStepThree;
