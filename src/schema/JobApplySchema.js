import * as Yup from 'yup';

export const jobApplySchema = Yup.object().shape({
  firstName: Yup.string().min(1).required('First name is required'),
  middleName: Yup.string().optional().default(''),
  lastName: Yup.string().min(1).required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  coverLetter: Yup.string().min(1).required('Cover letter is required'),
  experience: Yup.string().optional().default(''),
  availability: Yup.string().optional().default(''),
  file: Yup.mixed()
    .test('fileSize', 'File must be 5MB or less', value => {
      if (!value?.length) return true;
      return value[0].size <= 5 * 1024 * 1024;
    })
    .test('fileFormat', 'Unsupported file format', value => {
      if (!value?.length) return true;
      return ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value[0].type);
    }),
});
