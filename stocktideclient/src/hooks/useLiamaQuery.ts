import { useState } from 'react';
import axios from 'axios';

const useLiamaQuery = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const askLiama = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/liama/ask', { query });
      setResult(response.data);
    } catch (error) {
      console.error("Liama 쿼리 오류", error);
    } finally {
      setLoading(false);
    }
  };

  return { askLiama, result, loading };
};
export default useLiamaQuery;