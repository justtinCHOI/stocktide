import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import ToastManager from '@utils/toastUtil';

const useLiamaQuery = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const askLiama = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/liama/ask', {
        query,
        role: 'user'
      });
      console.log('Liama API response:', response);  // 추가
      setResult(response.data);
      ToastManager.success(t('liama.querySuccess'));
    } catch (err) {
      console.error('Liama API error:', err);  // 추가
      const errorMessage = err instanceof Error ? err.message : t('liama.unknownError');
      setError(errorMessage);
      ToastManager.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { askLiama, result, loading, error };
};

export default useLiamaQuery;