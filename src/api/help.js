import { apiClient } from '@/utils/apiClient';

export const createHelpRequest = (data) =>
  apiClient('/help', { method: 'POST', body: JSON.stringify(data) });
export const fetchHelpRequests = (status = 'open') =>
  apiClient(`/help?status=${status}`, { method: 'GET' });

export const resolveHelpRequest = (id) =>
  apiClient(`/help/${id}/resolve`, { method: 'PATCH' });
