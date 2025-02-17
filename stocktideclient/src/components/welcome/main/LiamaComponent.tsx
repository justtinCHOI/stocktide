import { useState } from 'react';
import useLiamaQuery from '@hooks/useLiamaQuery';

const LiamaComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const { askLiama, result, loading } = useLiamaQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askLiama(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Liama에게 질문하세요"
        />
        <button type="submit" disabled={loading}>
          {loading ? '처리 중...' : '질문'}
        </button>
      </form>
      {result && (
        <div dangerouslySetInnerHTML={{ __html: result }} />
      )}
    </div>
  );
};

export default LiamaComponent;