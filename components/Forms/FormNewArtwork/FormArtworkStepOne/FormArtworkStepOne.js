import { Field, FieldArray } from 'formik';
import { FormDropzoneArtwork } from 'components/Forms';

const FormArtworkStepOne = ({ values, errors, touched, setFieldValue }) => {
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
    <div className="form__group form__group--title">
      <div className="form__group-heading">Title</div>
      <Field type="text" name="title" placeholder="Enter artwork title" className={`form__field form__field-input ${errors.title && touched.title && "form__field--error"}`} />
      {errors.title && touched.title ? (
         <div className="form__group-error">{errors.title}</div>
       ) : null}
    </div>
    <div className="form__group form__group--description">
      <div className="form__group-heading">Description</div>
      <Field as="textarea" type="text" name="description" placeholder="Enter short description" className={`form__field form__field-textarea ${errors.description && touched.description && "form__field--error"}`} />
      {errors.description && touched.description ? (
         <div className="form__group-error">{errors.description}</div>
       ) : null}
    </div>
    <div className="form__group form__group--tags">
      <div className="form__group-heading">Suggested tags</div>
      <FieldArray name="tags">
        {({ remove, push }) => (
          <div className="form__tags">
            {values.tags.length > 0 &&
              values.tags.map((tag, index) => {
                return (<div className={`form__tags-item ${tag === '' ? "form__tags-item--empty" : ""}`} key={index}>
                  <Field
                    name={`tags.${index}`}
                    placeholder=""
                    type="text"
                    className="form__tags-field"
                    autoFocus={tag === ''}
                    style={{ width: `${tag.length + 1}ch` }}
                  />
                  <button
                    type="button"
                    className="form__tags-btn form__tags-btn--remove"
                    onClick={() => remove(index)}
                  >
                    <i className="icon icon-close"></i>
                  </button>
                  <button
                    type="button"
                    className="form__tags-btn form__tags-btn--save"
                    onClick={() => console.log("save", index)}
                  >
                    <i className="icon icon-done"></i>
                  </button>
                </div>)
              })}
            <button
              type="button"
              className="form__tags-add"
              onClick={() => push("")}
            >
              +
            </button>
          </div>
        )}
      </FieldArray>
      {errors.tags && touched.tags ? (
         <div className="form__group-error">{errors.tags}</div>
       ) : null}
    </div>
  </>
}

export default FormArtworkStepOne;
