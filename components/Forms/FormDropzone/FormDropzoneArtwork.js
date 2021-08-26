import {useDropzone} from 'react-dropzone';
import ImagePreview from 'components/ImagePreview';
import VideoPreview from 'components/VideoPreview';

const FormDropzoneArtwork = ({ setFieldValue, value, fieldName, thumb, errors, touched, className, type, msg }) => {
  const {getRootProps, getInputProps} = useDropzone({
     accept: type === 'image' ? '.jpg,.jpeg,.png,.gif' : '.jpg,.jpeg,.png,.gif,.mp4',
     maxFiles: 1,
     maxFilesize: 30,
     multiple: false,
     onDrop: (acceptedFiles, fileRejections, event) => {
       setFieldValue(fieldName, acceptedFiles);
     }
  });
  return (
    <>
      <div {...getRootProps({
          className: `form-dropzone ${className} ${errors[fieldName] && touched[fieldName] && (className + "--error")}`
        })}>
        <input {...getInputProps()} />
        {
          type === 'image' ?
          <div className="form-dropzone__container form-dropzone__container--image">
            <div className="form-dropzone__footer-column">
              <img src="/upload-image.svg" alt="Uplaod image icon" className="form-dropzone__footer-column-img" />
              <div className="form-dropzone__footer-column-text">
                <div className="form-dropzone__footer-column-title">Upload cover</div>
                <div className="form-dropzone__footer-column-format">PNG, JPG, GIF</div>
              </div>
            </div>
          </div> : <div className="form-dropzone__container form-dropzone__container--content">
            <div className="form-dropzone__icon">
              <img src="/upload.svg" alt="Upload icon"/>
            </div>
            <div className="form-dropzone__title">Drag and drop</div>
            <div className="form-dropzone__subtitle">{msg}</div>
            <div className="form-dropzone__note">
              PNG, GIF, WEBP, MP4 or MP3. Max 30 Mb
            </div>
            <div className="form-dropzone__footer">
              <div className="form-dropzone__footer-column">
                <img src="/upload-image.svg" alt="Uplaod image icon" className="form-dropzone__footer-column-img" />
                <div className="form-dropzone__footer-column-text">
                  <div className="form-dropzone__footer-column-title">High resolution images</div>
                  <div className="form-dropzone__footer-column-format">PNG, JPG, GIF</div>
                </div>
              </div>
              <div className="form-dropzone__footer-column">
                <img src="/upload-gif.svg" alt="Uplaod gif icon" className="form-dropzone__footer-column-img" />
                <div className="form-dropzone__footer-column-text">
                  <div className="form-dropzone__footer-column-title">Animated gifs</div>
                  <div className="form-dropzone__footer-column-format">400X300, 800X600</div>
                </div>
              </div>
              <div className="form-dropzone__footer-column">
                <img src="/upload-video.svg" alt="Uplaod video icon" className="form-dropzone__footer-column-img" />
                <div className="form-dropzone__footer-column-text">
                  <div className="form-dropzone__footer-column-title">Videos</div>
                  <div className="form-dropzone__footer-column-format">MP4, MAX 30 Mb</div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      {
        errors[fieldName] && touched[fieldName] ? (<div className="form__group-error">{errors[fieldName]}</div>) : null,
        thumb && value.length > 0 && (<div className="form-dropzone__preview">
          <div className="form-dropzone__preview-name">{value[0].name}</div>
        </div>)
      }
    </>
  )
}

export default FormDropzoneArtwork;
