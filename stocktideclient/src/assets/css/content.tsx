import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    padding: 1rem;
    border-radius: 8px;
`;

export const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    width: 100%;
    position: relative;
`;

export const Label = styled.label`
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 1rem;
    color: #333;
`;

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

export const Input = styled.input`
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    width: 100%;
`;

export const Icon = styled.div`
    position: absolute;
    right: 1rem;
    cursor: pointer;
`;

export const ErrorMessage = styled.div`
    color: red;
    font-size: 0.875rem;
    margin-top: 0.5rem;
`;

export const Button = styled.button`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ContentBottom = styled.div`
    margin-bottom: 6rem;
`;


export const ReadOnlyInput = styled.input`
    width: 100%;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    background-color: #e2e8f0;
`;


export const ButtonRow = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1rem;
`;

export const Value = styled.div`
    width: 100%;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;