import { Formik, Field, Form, FieldArray } from 'formik';
import { FormDropzonePost } from 'components/Forms';
import * as Yup from 'yup';

const NewPostSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(150, 'Too Long!')
    .required('Required'),
  text: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  illustration: Yup.array()
    .min(1, 'Image is required')
    .required('Required'),
  tags: Yup.array()
    .min(1)
    .required('Required'),
});

const initialValues = {
  title: "",
  text: "",
  illustration: [],
  tags: ["visual", "contemporary", "objects", "collectible"],
};

const FormNewPost = (props) => {
  const { close } = props;

  const previewImage = (file) => {
    const preview = URL.createObjectURL(file);
    return (<div className="form__preview">
      <img src={preview} alt={file.name} />
    </div>)
  }

  return (
    <div className="post-new">
      <div className="post-new__title">New post</div>
      <Formik
        initialValues={initialValues}
        validationSchema={NewPostSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          close && close();
        }}
      >
        {({ values, errors, touched, isSubmitting, handleReset, setFieldValue }) => (
          <Form className="post-new__form">
            <div className="form__group form__group--title">
              <div className="form__group-heading">Title</div>
              <Field type="text" name="title" placeholder="New post title" className={`form__field form__field-input ${errors.title && touched.title && "form__field--error"}`} />
              {errors.title && touched.title ? (
                 <div className="form__group-error">{errors.title}</div>
               ) : null}
            </div>
            <div className="form__group form__group--text">
              <div className="form__group-heading">Text</div>
              <Field as="textarea" type="text" name="text" placeholder="Enter post content" className={`form__field form__field-textarea ${errors.text && touched.text && "form__field--error"}`} />
              {errors.text && touched.text ? (
                 <div className="form__group-error">{errors.text}</div>
               ) : null}
            </div>
            <div className="form__group form__group--illustration">
              <div className="form__group-heading">Illustration</div>
              <FormDropzonePost fieldName="illustration" setFieldValue={setFieldValue} errors={errors} touched={touched} className="form__dropzone" />
              {errors.illustration && touched.illustration ? (
                 <div className="form__group-error">{errors.illustration}</div>
               ) : null}
              { values.illustration.length > 0 && previewImage(values.illustration[0]) }
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

            <div className="post-new__actions">
              <button
                type="reset"
                className="btn post-new__actions-btn"
                disabled={isSubmitting}
                onClick={handleReset}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn post-new__actions-btn  post-new__actions-btn--submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  )
};

export default FormNewPost;
