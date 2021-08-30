import { Formik, Form } from 'formik';
import { ArtworkNewTitle } from 'components/ArtworkNew';
import { FormArtworkStepZero, FormArtworkStepOne, FormArtworkStepTwo, FormArtworkStepThree } from 'components/Forms/FormNewArtwork';
import { artworkSchema } from 'schemas';

const FormNewArtwork = ({ initialValues, action }) => {
  return <Formik
    initialValues={initialValues}
    validationSchema={artworkSchema}
    onSubmit={async (values) => {
      action(values);
    }}
  >
    {({ values, errors, touched, isSubmitting, handleReset, setFieldValue }) => (
      <Form className={`artwork-new__form artwork-new__form--step-${values.step}`}>
        <div className="artwork-new__step artwork-new__step--0">
          <div className="artwork-new__step-container">
            <FormArtworkStepZero values={values} errors={errors} touched={touched} setFieldValue={setFieldValue} />
          </div>
        </div>
        <div className="artwork-new__step artwork-new__step--1">
          <ArtworkNewTitle step="01" title="Artwork information" subtitle="create a collectible" />
          <div className="artwork-new__step-container">
            <FormArtworkStepOne values={values} errors={errors} touched={touched} setFieldValue={setFieldValue} />
          </div>
        </div>
        <div className="artwork-new__step artwork-new__step--2">
          <ArtworkNewTitle step="02" title="Marketplace" subtitle="create a collectible" />
          <div className="artwork-new__step-container">
            <div className="artwork-new__subtitle">Marketplace Preferences</div>
            <FormArtworkStepTwo values={values} errors={errors} touched={touched} setFieldValue={setFieldValue} />
          </div>
        </div>
        <div className="artwork-new__step artwork-new__step--3">
          <ArtworkNewTitle step="03" title="Preview" subtitle="create a collectible" />
          <div className="artwork-new__step-container">
            <div className="artwork-new__subtitle">Artwork preview</div>
            <FormArtworkStepThree values={values} />
          </div>
        </div>
        <div className="artwork-new__step-container">
          <div className={`artwork-new__errors artwork-new__errors--step-${values.step}`}>
            {
              Object.keys(errors).length > 0 && <div className="artwork-new__errors-msg">Some fields have validation errors. Fix them before submit</div>
            }
          </div>
          <div className="artwork-new__actions">
            <button
              type="reset"
              className="btn artwork-new__actions-btn artwork-new__actions-btn--cancel"
              disabled={isSubmitting}
              onClick={handleReset}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn artwork-new__actions-btn artwork-new__actions-btn--back"
              onClick={() => setFieldValue("step", values.step - 1)}
            >
              Back
            </button>
            <button
              type="button"
              className="btn artwork-new__actions-btn artwork-new__actions-btn--next"
              onClick={() => setFieldValue("step", values.step + 1)}
            >
              Next
            </button>
            <button
              type="submit"
              className="btn artwork-new__actions-btn artwork-new__actions-btn--submit"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    )}
  </Formik>
}

export default FormNewArtwork;
