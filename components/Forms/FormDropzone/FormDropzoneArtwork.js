import {useDropzone} from 'react-dropzone';
import ImagePreview from 'components/ImagePreview';
import VideoPreview from 'components/VideoPreview';

const FormDropzoneArtwork = ({ setFieldValue, value, fieldName, thumb, errors, touched, className, type, msg }) => {
  const {getRootProps, getInputProps} = useDropzone({
     accept: type === 'image' ? '.jpg,.jpeg,.png,.gif' : '.mp4',
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
          <div className="form-dropzone__container">
            <div className="form-dropzone__icon">
              <img src="/upload.svg" alt="Upload icon"/>
            </div>
            <div className="form-dropzone__title">Drag and drop</div>
            <div className="form-dropzone__subtitle">{msg}</div>
            <div className="form-dropzone__note">
              PNG, JPG, GIF
            </div>
          </div> : <div className="form-dropzone__container">
            <div className="form-dropzone__icon">
              <img src="/upload.svg" alt="Upload icon"/>
            </div>
            <div className="form-dropzone__title">Drag and drop</div>
            <div className="form-dropzone__subtitle">{msg}</div>
            <div className="form-dropzone__note">
              MP4, MAX 30 Mb
            </div>
          </div>
        }
      </div>
      {
        errors[fieldName] && touched[fieldName] ? (<div className="form__group-error">{errors[fieldName]}</div>) : null,
        thumb && value.length > 0 && (type === "image" ? <ImagePreview file={value[0]} /> : <VideoPreview file={value[0]} />)
      }
    </>
  )
}

export default FormDropzoneArtwork;
