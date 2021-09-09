import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router'
import { priceFormat } from "utils/format";
import * as Yup from 'yup';

Yup.setLocale({
  number: {
    min: 'Bid should be ${min} or more',
    max: 'Not enough funds!',
  },
});

const NewBidSchema = (minBid, maxBid) => Yup.object().shape({
  bid: Yup.number().required().positive().min(minBid).max(maxBid),
});

const initialValues = {
  bid: 0,
};

const FormNewBid = ({ balance, minBid, submit }) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewBidSchema(minBid, Math.ceil(balance.bidding_balance / (1 + balance.service_fee) * 100) / 100)}
      onSubmit={submit}
    >
      {({ values, errors, touched, isSubmitting, handleReset }) => (
        <Form className="bid-new__form">
          <div className="form__group form__group--bid">
            <Field type="number" name="bid" min={0} step={0.01} className={`form__field form__field-input form__field--bid ${errors.bid && touched.bid && "form__field--error"}`} />
            {errors.bid && touched.bid ? (
               <div className="form__group-error">{errors.bid}</div>
             ) : null}
          </div>

          <div className="bid-new__form-row">
            <div className="bid-new__form-col">
              <div className="bid-new__form-note">
                Your bidding balance : <span>{priceFormat(balance.bidding_balance)} ETH</span>
              </div>
              <div className="bid-new__form-note">
                Service fee : <span>{values.bid ? priceFormat(+values.bid * balance.service_fee) : 0} ETH</span>
              </div>
              <div className="bid-new__form-note">
                You will pay : <span>{values.bid ? priceFormat(+values.bid * (1 + balance.service_fee)) : 0} ETH</span>
              </div>
            </div>
            <div className="bid-new__form-col">
              <div className="bid-new__form-rate-wrapper">
                <div className="bid-new__form-rate">
                  ~ ${values.bid ? priceFormat(+values.bid * balance.eth_rate) : 0}
                </div>
                <div className="bid-new__form-instruction">
                  You can withdraw your bid anytime <br/>
                  <a href="#" target="_blank" className="bid-new__form-instruction-link">Learn how our auctions work</a>
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
              Place a bid
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
};

export default FormNewBid;
