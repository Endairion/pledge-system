import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface LookupRecord {
  id: string;
  name: string;
}

export function useLookupData(tableName: string) {
  const [data, setData] = useState<LookupRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/admin/lookups/${tableName}`);
        
        // The API returns { data: [...] } format
        const records = response.data.data || [];
        setData(Array.isArray(records) ? records : []);
      } catch (err) {
        console.error(`Error fetching ${tableName}:`, err);
        setError(`Failed to load ${tableName}`);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (tableName) {
      fetchData();
    }
  }, [tableName]);

  return { data, loading, error };
}
