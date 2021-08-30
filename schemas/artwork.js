import * as Yup from 'yup';

const artworkSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, 'Too short!')
    .required('Required'),
  description: Yup.string()
    .min(80, 'Too short!')
    .required('Required'),
  content: Yup.array().min(1, 'Content is required').required('Required'),
  preview: Yup.array().when(['content'], {
    is: (content) => content.length > 0 && content[0].type.substr(0, content[0].type.lastIndexOf('/')) === 'video',
    then: Yup.array().min(1).required('Required'),
  }),
  tags: Yup.array()
    .min(1)
    .required('Required'),
  sale: Yup.boolean().required('Required'),
  saleType: Yup.mixed().when('sale', {
    is: true,
    then: Yup.mixed().oneOf(['fixed', 'timed', 'unlimited']).required('Required'),
    otherwise: Yup.mixed().nullable().notRequired().default(null),
  }),
  price: Yup.object().shape({
    value: Yup.number().when('sale', {
      is: true,
      then: Yup.number().required().min(0, "Price can't be less than 0"),
      otherwise: Yup.number().nullable().notRequired().default(null),
    }),
    currency: Yup.mixed()
      .oneOf(['eth', 'usd'])
      .default('eth')
      .required('Required'),
  }),
  unlockStatus: Yup.boolean(),
  unlockValue: Yup.string().when(['sale', 'unlockStatus'], {
    is: (sale, unlockStatus) => sale && unlockStatus,
    then: Yup.string().required(),
    otherwise: Yup.string().nullable().notRequired().default(null),
  }),
  royalty: Yup.number().when('unlockStatus', {
    is: true,
    then: Yup.number().integer()
      .max(50, "Royalty can't be more than the half of cost")
      .min(0, "Royalty can't be less than 0"),
    otherwise: Yup.number().nullable().notRequired().default(null),
  }),
});

export default artworkSchema;
