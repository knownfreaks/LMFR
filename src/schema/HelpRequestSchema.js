import * as Yup from 'yup';

export const helpRequestSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  description: Yup.string().required('Description is required'),
});
