import { apiClient } from '@/utils/apiClient';

export const createHelpRequest = (body) =>
  apiClient('/help', { method: 'POST', body: JSON.stringify(body) });

export const fetchHelpRequests = () =>
  apiClient('/help?status=open', { method: 'GET' });

export const resolveHelpRequest = (id) =>
  apiClient(`/help/${id}/resolve`, { method: 'PATCH' });
