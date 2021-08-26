import { Field, FieldArray } from 'formik';
import { FormCheckbox } from "components/Forms";

const FormArtworkStepTwo = ({ values, errors, touched }) => {
  const { sale, saleType, price, royalty, unlockStatus } = values;
  return <>
    <div className="form__group form__group-sale">
      <div className="form__group-heading">Put on marketplace</div>
      <div className="form__group-checkbox form__group-checkbox--top">
        <FormCheckbox checked={sale} name="sale" />
      </div>
      {
        sale && <>
          <div className="form__group-sale-type" role="group" aria-labelledby="radio-group">
            <label className={`form__group-sale-type-item ${saleType === 'fixed' ? "form__group-sale-type-item--active" : ""}`}>
              <Field type="radio" name="saleType" value="fixed" />
              <i className="icon icon-label"></i>
              <span>Fixed price</span>
            </label>
            <label className={`form__group-sale-type-item ${saleType === 'timed' ? "form__group-sale-type-item--active" : ""}`}>
              <Field type="radio" name="saleType" value="timed" />
              <i className="icon icon-clock"></i>
              <span>Timed auction</span>
            </label>
            <label className={`form__group-sale-type-item ${saleType === 'unlimited' ? "form__group-sale-type-item--active" : ""}`}>
              <Field type="radio" name="saleType" value="unlimited" />
              <i className="icon icon-unlimited"></i>
              <span>Unlimited auction</span>
            </label>
          </div>
          {errors.saleType && touched.saleType ? (
             <div className="form__group-error">{errors.saleType}</div>
           ) : null}
          <div className="form__group form__group--price">
             <div className="form__group-heading">Price</div>
             <div className="form__group-row">
               <Field type="number" name="price.value" placeholder="Enter price for one piece" className={`form__field form__field-input ${errors.price && errors.price.value && touched.price && touched.price.value && "form__field--error"}`} />
               <Field
                  name="price.currency"
                >
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <div className="form__field-select-container">
                      <select {...field} className={`form__field form__field-select form__field-select--currency ${errors.price && errors.price.currency && touched.price && touched.price.currency ? "form__field--error" : ""}`}>
                        <option value="eth">ETH</option>
                        <option value="usd">USD</option>
                      </select>
                      <i className="icon icon-arrow-down"></i>
                    </div>
                  )}
                </Field>
             </div>
             {errors.price && errors.price.value && touched.price && touched.price.value ? (
                <div className="form__group-error">{errors.price.value}</div>
              ) : null}
              <div className="form__group-note">Service fee <span className="form__group-note-value">2.5%</span></div>
              <div className="form__group-note">You will receive <span className="form__group-note-value">0 ETH</span></div>
          </div>
          <div className="form__group form__group--unlockable">
            <div className="form__group-icon">
              <i className="icon icon-diamond"></i>
            </div>
            <div className="form__group-unlockable-text">
              <div className="form__group-heading">Unlockable content</div>
              <div className="form__group-text">Content wil be unlocked after succesfull transaction</div>
            </div>
            <div className="form__group-checkbox">
              <FormCheckbox checked={unlockStatus} name="unlockStatus" kind="inverse" />
            </div>
          </div>
          {
            unlockStatus && <div className="form__group form__group--unlockValue">
               <div className="form__group-heading">Unlockable content</div>
               <Field type="text" name="unlockValue" placeholder="Enter text or/and link to content" className={`form__field form__field-input ${errors.unlockValue && touched.unlockValue && "form__field--error"}`} />
               {errors.unlockValue && touched.unlockValue ? (
                  <div className="form__group-error">{errors.unlockValue}</div>
                ) : null}
            </div>
          }
          <div className="form__group form__group--royalty">
             <div className="form__group-heading">Royalties</div>
             <Field type="number" name="royalty" placeholder="Enter percents of royalties" className={`form__field form__field-input form__field-input--royalty ${errors.royalty && touched.royalty && "form__field--error"}`} />
             {errors.royalty && touched.royalty ? (
                <div className="form__group-error">{errors.royalty}</div>
              ) : null}
              <div className="form__group-note">Suggested : 10% , 20% , 30%</div>
          </div>
        </>
      }
    </div>
  </>
}

export default FormArtworkStepTwo;
