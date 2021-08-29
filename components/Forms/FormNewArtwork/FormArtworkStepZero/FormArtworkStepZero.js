import { FormDropzoneArtwork } from 'components/Forms';

const FormArtworkStepZero = ({ values, errors, touched, setFieldValue }) => {
  const isVideo = values.content.length > 0 && values.content[0].type.indexOf('video') >= 0;
  return <>
    <div className="form__group form__group--image">
      <FormDropzoneArtwork
        fieldName="content"
        thumb={true}
        value={values.content}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
        className="form__dropzone form__dropzone--artwork"
        msg="Browse to choose a file"
      />
    </div>
    {
      isVideo && <div className="form__group form__group--preview">
        <FormDropzoneArtwork
          type="image"
          fieldName="preview"
          thumb={true}
          value={values.preview}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          className="form__dropzone form__dropzone--artwork"
          msg="Browse to choose an image file for preview"
        />
      </div>
    }
  </>
}

export default FormArtworkStepZero;
