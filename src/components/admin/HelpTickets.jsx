import React, { useEffect, useState } from 'react';
import { fetchHelpRequests, resolveHelpRequest } from '@/api/help';
import { toast } from 'react-toastify';

const HelpTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = async () => {
    try {
      const res = await fetchHelpRequests();
      if (res?.success) {
        setTickets(res.data.tickets || []);
      } else {
        toast.error(res?.message || 'Failed to load');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error loading tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleResolve = async (id) => {
    try {
      const res = await resolveHelpRequest(id);
      if (res?.success) {
        toast.success('Marked resolved');
        loadTickets();
      } else {
        toast.error(res?.message || 'Failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Request failed');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Help Tickets</h2>
      {tickets.length === 0 ? (
        <p>No open tickets.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div key={t.id} className="border p-4 rounded flex justify-between">
              <div>
                <p className="font-semibold">{t.subject}</p>
                <p className="text-sm text-gray-700">{t.description}</p>
              </div>
              <button
                onClick={() => handleResolve(t.id)}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm"
              >
                Resolve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpTickets;
