import React, { useState } from 'react';
import useLiamaQuery from '@hooks/useLiamaQuery';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const LiamaComponent: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const { askLiama, result, loading, error } = useLiamaQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askLiama(query);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('liama.placeholderText')}
          disabled={loading}
        />
        <SubmitButton type="submit" disabled={loading || !query}>
          {loading ? t('liama.processing') : t('liama.submit')}
        </SubmitButton>
      </Form>
      {result && (
        <ResultContainer>
          <ReactMarkdown>{result}</ReactMarkdown>
        </ResultContainer>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #cccccc;
  }
`;

const ResultContainer = styled.div`
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

export default LiamaComponent;