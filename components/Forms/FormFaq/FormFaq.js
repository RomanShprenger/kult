import {useEffect} from "react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import {useFormikContext, Formik, Form, Field} from 'formik';

// Import Swiper style
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);

const filtersLabel = {
  platform: 'Platform',
  artists: 'About artists',
  bidding: 'Bidding',
  pricing: 'Pricing'
};

const AutoSubmit = () => {
  const {values, submitForm} = useFormikContext();
  useEffect(() => {
    submitForm();
  }, [values, submitForm]);
  return null;
};

const FormFaq = ({action}) => {
  const filters = ["platform", "artists", "bidding", "pricing"];

  return <div className="faq__form">
    <div className="container">
      <Formik initialValues={{
          query: '',
          ...filters.reduce((result, item) => {
            result[item.value] = false;
            return result;
          }, {})
        }} validate={values => {
          const errors = {};
          if (values.length < 2) {
            errors.token = 'Invalid code. Too short.';
          }
          return errors;
        }} onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          const categories = filters.filter(item => values[item]);
          action({query: values.query, categories: categories});
        }}>
        {
          (values) => (<Form>
            <div className="faq__form-field">
              <i className="icon icon-search faq__form-field-icon"></i>
              <Field name="query" type="text" placeholder='Search' className="faq__form-input"/>
            </div>
            <div className="faq__form-filters">
              {
                filters.map(item => <label key={item} className="faq__form-label">
                  <Field type="checkbox" name={item} className="faq__form-checkbox" />
                  <div className="faq__form-filter">
                    <i className="icon icon-clock"></i>
                    <span className="faq__form-filter-text">{filtersLabel[item]}</span>
                  </div>
                </label>)
              }
            </div>
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true,
                modifierClass: "faq__form-slider-pagination-"
              }}
              className="faq__form-slider"
            >
              {
                filters.map(item => <SwiperSlide key={item}><label className="faq__form-label">
                  <Field type="checkbox" name={item} className="faq__form-checkbox" />
                  <div className="faq__form-filter">
                    <i className="icon icon-clock"></i>
                    <span className="faq__form-filter-text">{filtersLabel[item]}</span>
                  </div>
                </label></SwiperSlide>)
              }
            </Swiper>
            <AutoSubmit/>
          </Form>)
        }
      </Formik>
    </div>
  </div>
}

export default FormFaq;
