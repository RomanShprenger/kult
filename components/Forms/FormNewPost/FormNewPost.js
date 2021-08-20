import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import {useDropzone} from 'react-dropzone';
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

const Dropzone = ({ setFieldValue, errors, touched }) => {
  const {getRootProps, getInputProps} = useDropzone({
     accept: 'image/*',
     maxFiles: 1,
     multiple: false,
     noDrag: true,
     onDrop: (acceptedFiles, fileRejections, event) => {
       setFieldValue("illustration", acceptedFiles);
     }
  });
  return (
    <div {...getRootProps({className: `post-new__dropzone ${errors.illustration && touched.illustration && "post-new__dropzone--error"}`})}>
      <input {...getInputProps()} />
      <p><i className="icon icon-picture"></i>Upload image</p>
    </div>
  )
}

const FormNewPost = (props) => {
  const { close } = props;
   const previewImage = (file) => {
     const preview = URL.createObjectURL(file);
     return (<div className="post-new__preview">
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
            <div className="post-new__group post-new__group-title">
              <div className="post-new__group-heading">Title</div>
              <Field type="text" name="title" placeholder="New post title" className={`post-new__field post-new__field-input ${errors.title && touched.title && "post-new__field--error"}`} />
              {errors.title && touched.title ? (
                 <div className="post-new__group-error">{errors.title}</div>
               ) : null}
            </div>
            <div className="post-new__group post-new__group-text">
              <div className="post-new__group-heading">Text</div>
              <Field as="textarea" type="text" name="text" placeholder="Enter post content" className={`post-new__field post-new__field-textarea ${errors.text && touched.text && "post-new__field--error"}`} />
              {errors.text && touched.text ? (
                 <div className="post-new__group-error">{errors.text}</div>
               ) : null}
            </div>
            <div className="post-new__group post-new__group-illustration">
              <div className="post-new__group-heading">Illustration</div>
              <Dropzone setFieldValue={setFieldValue} errors={errors} touched={touched} />
              {errors.illustration && touched.illustration ? (
                 <div className="post-new__group-error">{errors.illustration}</div>
               ) : null}
              { values.illustration.length > 0 && previewImage(values.illustration[0]) }
            </div>
            <div className="post-new__group post-new__group-tags">
              <div className="post-new__group-heading">Suggested tags</div>
              <FieldArray name="tags">
                {({ insert, remove, push }) => (
                  <div className="post-new__tags">
                    {values.tags.length > 0 &&
                      values.tags.map((tag, index) => (
                        <div className="post-new__tags-item" key={index}>
                          <Field
                            name={`tags.${index}`}
                            placeholder=""
                            type="text"
                            className="post-new__tags-field"
                            style={{ width: `${tag.length + 1}ch` }}
                          />
                          <button
                            type="button"
                            className="post-new__tags-btn post-new__tags-btn--remove"
                            onClick={() => remove(index)}
                          >
                            <i className="icon icon-close"></i>
                          </button>
                          <button
                            type="button"
                            className="post-new__tags-btn post-new__tags-btn--save"
                            onClick={() => console.log("save", index)}
                          >
                            <i className="icon icon-done"></i>
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="post-new__tags-add"
                      onClick={() => push("")}
                    >
                      +
                    </button>
                  </div>
                )}
              </FieldArray>
              {errors.tags && touched.tags ? (
                 <div className="post-new__group-error">{errors.tags}</div>
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
              >Submit</button>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  )
};

export default FormNewPost;
