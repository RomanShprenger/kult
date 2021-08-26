import { Formik, Form } from 'formik';
import { ArtworkNewTitle } from 'components/ArtworkNew';
import { FormArtworkStepOne, FormArtworkStepTwo, FormArtworkStepThree } from 'components/Forms/FormNewArtwork';
import { artworkSchema } from 'schemas';

const FormNewArtwork = ({ artwork, action, step, setStep, owner }) => {
  return <Formik
    initialValues={{
      ...artwork,
      owner: owner
    }}
    validationSchema={artworkSchema}
    onSubmit={async (values) => {
      action(values);
    }}
  >
    {({ values, errors, touched, isSubmitting, handleReset, setFieldValue }) => (
      <Form className="artwork-new__form">
        <div className="artwork-new__step artwork-new__step--1">
          <div className="artwork-new__step-container">
            <ArtworkNewTitle step="01" title="Artwork information" subtitle="create a collectible" />
            <FormArtworkStepOne values={values} errors={errors} touched={touched} setFieldValue={setFieldValue} />
          </div>
        </div>
        <div className="artwork-new__step artwork-new__step--2">
          <div className="artwork-new__step-container">
            <ArtworkNewTitle step="02" title="Marketplace" subtitle="create a collectible" />
            <div className="artwork-new__subtitle">Marketplace Preferences</div>
            <FormArtworkStepTwo values={values} errors={errors} touched={touched} setFieldValue={setFieldValue} />
          </div>
        </div>
        <div className="artwork-new__step artwork-new__step--3">
          <div className="artwork-new__step-container">
            <ArtworkNewTitle step="03" title="Preview" subtitle="create a collectible" />
            <div className="artwork-new__subtitle">Artwork preview</div>
            <FormArtworkStepThree values={values} />
          </div>
        </div>
        <div className="artwork-new__step-container">
          <div className="artwork-new__actions">
            <button
              type="reset"
              className="btn artwork-new__actions-btn"
              disabled={isSubmitting}
              onClick={handleReset}
            >
              Cancel
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
