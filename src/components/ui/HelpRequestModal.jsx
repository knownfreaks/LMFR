import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { helpRequestSchema } from '@/schema/HelpRequestSchema';
import { createHelpRequest } from '@/api/help';
import { toast } from 'react-toastify';

const HelpRequestModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(helpRequestSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await createHelpRequest(data);
      if (res?.success) {
        toast.success('Request submitted');
        reset();
        onClose();
      } else {
        toast.error(res?.message || 'Failed to submit');
      }
    } catch (err) {
      toast.error(err.message || 'Request failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow p-6 w-full max-w-md z-10">
        <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Subject"
              {...register('subject')}
              className="w-full border p-2 rounded"
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
          </div>
          <div>
            <textarea
              placeholder="Describe your issue"
              {...register('message')}
              rows={4}
              className="w-full border p-2 rounded"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpRequestModal;
