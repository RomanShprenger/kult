const ImagePreview = ({ file }) => {
  const preview = URL.createObjectURL(file);
  return (<div className="image-preview">
    <img className="image-preview__img" src={preview} alt={file.name} />
  </div>)
}

export default ImagePreview;
