import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router'
import { priceFormat } from "utils/format";
import * as Yup from 'yup';

Yup.setLocale({
  number: {
    max: 'Not enough funds!',
  },
});

const PurchaseSchema = (balance) => Yup.object().shape({
  payment: Yup.number().required().positive().max(balance),
});

const FormPurchase = ({ balance, price, submit }) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        payment: price
      }}
      validationSchema={PurchaseSchema(balance.bidding_balance)}
      onSubmit={submit}
    >
      {({ values, errors, touched, isSubmitting, handleReset }) => (
        <Form className="bid-new__form">
          <div className="form__group form__group--payment">
            <div className={`form__field form__field-input form__field--payment ${errors.payment && touched.payment && "form__field--error"}`}>
              {values.payment} <span>ETH</span>
            </div>
            {errors.payment && touched.payment ? (
               <div className="form__group-error">{errors.payment}</div>
             ) : null}
          </div>

          <div className="bid-new__form-row">
            <div className="bid-new__form-col">
              <div className="bid-new__form-note">
                Your deductible balance : <span>{priceFormat(balance.bidding_balance)} ETH</span>
              </div>
              <div className="bid-new__form-note">
                Service fee : <span>{values.payment ? priceFormat(+values.payment * balance.service_fee) : 0} ETH</span>
              </div>
              <div className="bid-new__form-note">
                You will pay : <span>{values.payment ? priceFormat(+values.payment * (1 + balance.service_fee)) : 0} ETH</span>
              </div>
            </div>
            <div className="bid-new__form-col">
              <div className="bid-new__form-rate-wrapper">
                <div className="bid-new__form-rate">
                  ~ ${values.payment ? priceFormat(+values.payment * balance.eth_rate) : 0}
                </div>
                <div className="bid-new__form-instruction">
                  <a href="#" target="_blank" className="bid-new__form-instruction-link">Learn more about your purchase</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bid-new__actions">
            <button
              type="back"
              className="btn bid-new__actions-btn"
              onClick={() => router.back()}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn bid-new__actions-btn bid-new__actions-btn--submit"
            >
              Buy an artwork
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
};

export default FormPurchase;
