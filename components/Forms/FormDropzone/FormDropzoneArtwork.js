import {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { fileSizeFormat } from 'utils/format';

const FormDropzoneArtwork = ({
  setFieldValue,
  value,
  fieldName,
  thumb,
  errors,
  touched,
  className,
  type,
  msg
}) => {
  const [dropzoneErrors, setErrors] = useState("");
  const {getRootProps, getInputProps} = useDropzone({
    accept: type === 'image'
      ? '.jpg,.jpeg,.png,.gif'
      : '.jpg,.jpeg,.png,.gif,.mp4,.mov',
    maxFiles: 1,
    maxFilesize: 30,
    multiple: false,
    onDrop: (acceptedFiles, fileRejections, event) => {
      if (fileRejections.length === 0) {
        setErrors("");
      }

      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            setErrors(`Error: ${err.message}`);
          }

          if (err.code === "file-invalid-type") {
            setErrors(`Error: ${err.message}`);
          }
        });
      });

      setFieldValue(fieldName, acceptedFiles);
    }
  });

  const removeFile = (e) => {
    e.preventDefault();
    setFieldValue(fieldName, []);
  }

  if (value[0]) {
    return (<div className={`form-dropzone ${className}`}>
      <div className="form-dropzone__container">
        <a href="/" className="form-dropzone__remove" onClick={removeFile}>
          <i className="icon icon-close"></i>
        </a>
        <div className="form-dropzone__file">
          <img src="/file.svg" alt="File icon"/>
          <div className="form-dropzone__file-format">{value[0].type.substr(value[0].type.indexOf("/") + 1)}</div>
        </div>
        <div className="form-dropzone__name">{value[0].name}</div>
        <div className="form-dropzone__file-size">{fileSizeFormat(value[0].size)}</div>
      </div>
    </div>)
  }

  return (<>
    <div {...getRootProps({className: `form-dropzone ${className} ${errors[fieldName] && touched[fieldName] && (className + "--error")}`})}>
      <div className="form-dropzone__error-msg">{dropzoneErrors}</div>
      <input {...getInputProps()} />
      {
        type === 'image'
          ? <div className="form-dropzone__container form-dropzone__container--image">
              <div className="form-dropzone__footer-column">
                <img src="/upload-image.svg" alt="Upload image icon" className="form-dropzone__footer-column-img"/>
                <div className="form-dropzone__footer-column-text">
                  <div className="form-dropzone__footer-column-title">Upload cover</div>
                  <div className="form-dropzone__footer-column-format">PNG, JPG, GIF</div>
                </div>
              </div>
            </div>
          : <div className={`form-dropzone__container form-dropzone__container--content ${value[0] ? 'form-dropzone__container--loaded' : ''}`}>
            <div className="form-dropzone__icon">
              <img src="/upload.svg" alt="Upload icon"/>
            </div>
            <div className="form-dropzone__title">Drag and drop</div>
            <div className="form-dropzone__title form-dropzone__title-mobile">Tap to upload</div>
            <div className="form-dropzone__subtitle">{msg}</div>
            <div className="form-dropzone__note">
              PNG, GIF, WEBP, MP4 or MOV. Max 30 Mb
            </div>
            <div className="form-dropzone__footer">
              <div className="form-dropzone__footer-column">
                <img src="/upload-image.svg" alt="Uplaod image icon" className="form-dropzone__footer-column-img"/>
                <div className="form-dropzone__footer-column-text">
                  <div className="form-dropzone__footer-column-title">High resolution images</div>
                  <div className="form-dropzone__footer-column-format">PNG, JPG, GIF</div>
                </div>
              </div>
              <div className="form-dropzone__footer-column">
                <img src="/upload-gif.svg" alt="Uplaod gif icon" className="form-dropzone__footer-column-img"/>
                <div className="form-dropzone__footer-column-text">
                  <div className="form-dropzone__footer-column-title">Animated gifs</div>
                  <div className="form-dropzone__footer-column-format">400X300, 800X600</div>
                </div>
              </div>
              <div className="form-dropzone__footer-column">
                <img src="/upload-video.svg" alt="Uplaod video icon" className="form-dropzone__footer-column-img"/>
                <div className="form-dropzone__footer-column-text">
                  <div className="form-dropzone__footer-column-title">Videos</div>
                  <div className="form-dropzone__footer-column-format">MP4, MOV, MAX 30 Mb</div>
                </div>
              </div>
            </div>
        </div>
      }
    </div>
      {
        errors[fieldName] && touched[fieldName] ? (<div className="form__group-error">{errors[fieldName]}</div>) : null,
        type === 'image' && thumb && value.length > 0 && (
          <div className="form-dropzone__preview">
            <div className="form-dropzone__preview-name">{value[0].name}</div>
          </div>)
      }
    </>)
}

export default FormDropzoneArtwork;
