import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { jobApplySchema } from '@/schema/JobApplySchema';
import { applyToJob } from '@/api/student';
import { toast } from 'react-toastify';

const JobApplyModal = ({ isOpen, onClose, jobId, email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(jobApplySchema),
    defaultValues: { email },
  });

  const onSubmit = async (values) => {
    try {
      const payload = { ...values, file: values.file?.[0] };
      const res = await applyToJob(jobId, payload);
      if (res?.success) {
        toast.success(res.message || 'Applied successfully.');
        reset();
        onClose();
      } else {
        toast.error(res?.message || 'Application failed.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Application failed.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow p-6 w-full max-w-lg z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Job Application</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input placeholder="First Name" {...register('firstName')} className="w-full border p-2 rounded" />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div>
              <input placeholder="Middle Name" {...register('middleName')} className="w-full border p-2 rounded" />
              {errors.middleName && <p className="text-red-500 text-sm">{errors.middleName.message}</p>}
            </div>
            <div>
              <input placeholder="Last Name" {...register('lastName')} className="w-full border p-2 rounded" />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
            <div>
              <input placeholder="Email" type="email" {...register('email')} className="w-full border p-2 rounded" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <input placeholder="Phone" {...register('phone')} className="w-full border p-2 rounded" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <input placeholder="Experience" {...register('experience')} className="w-full border p-2 rounded" />
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
            </div>
            <div>
              <input placeholder="Availability" {...register('availability')} className="w-full border p-2 rounded" />
              {errors.availability && <p className="text-red-500 text-sm">{errors.availability.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <textarea
                rows={4}
                placeholder="Cover Letter"
                {...register('coverLetter')}
                className="w-full border p-2 rounded"
              />
              {errors.coverLetter && <p className="text-red-500 text-sm">{errors.coverLetter.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <input type="file" {...register('file')} className="w-full" />
              {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded" disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Apply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplyModal;
