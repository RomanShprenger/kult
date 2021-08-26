import {useDropzone} from 'react-dropzone';

const FormDropzonePost = ({ fieldName, setFieldValue, errors, touched, className }) => {
  const {getRootProps, getInputProps} = useDropzone({
     accept: 'image/*',
     maxFiles: 1,
     multiple: false,
     noDrag: true,
     onDrop: (acceptedFiles) => {
       setFieldValue(fieldName, acceptedFiles);
     }
  });
  return (
    <div {...getRootProps({
        className: `form-dropzone ${className} ${errors[fieldName] && touched[fieldName] && (className + "--error")}`
      })}>
      <input {...getInputProps()} />
      <p><i className="icon icon-picture"></i>Upload image</p>
    </div>
  )
}

export default FormDropzonePost;
