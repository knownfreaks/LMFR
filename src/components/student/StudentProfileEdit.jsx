import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getStudentProfile, updateStudentProfile } from '@/api/student';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  about: Yup.string().required('About is required'),
});

const StudentProfileEdit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    (async () => {
      try {
        const data = await getStudentProfile();
        if (data) {
          reset({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            about: data.about || '',
          });
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load profile');
      }
    })();
  }, [reset]);

  const onSubmit = async (form) => {
    try {
      const res = await updateStudentProfile(form);
      if (res?.success) {
        toast.success('Profile updated');
      } else {
        toast.error(res?.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            placeholder="First Name"
            {...register('firstName')}
            className="w-full border p-2 rounded"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div>
          <input
            placeholder="Last Name"
            {...register('lastName')}
            className="w-full border p-2 rounded"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
        <div>
          <textarea
            placeholder="About"
            {...register('about')}
            rows={4}
            className="w-full border p-2 rounded"
          />
          {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfileEdit;
