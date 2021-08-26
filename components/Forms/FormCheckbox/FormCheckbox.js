import { Field } from 'formik';

const FormCheckbox = ({ name, checked, kind }) => {
  return <label className={`form-checkbox form-checkbox--${checked ? 'on' : 'off'} ${kind ? `form-checkbox--${kind}` : ''}`}>
    <Field type="checkbox" name={name} className="form-checkbox__field"/>
  </label>;
}

export default FormCheckbox;
