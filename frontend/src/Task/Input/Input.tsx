import React from 'react';
import { Button, InputContainer } from './styles';
import { Container } from './styles';

interface Props {
    handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.SyntheticEvent) => void;
    taskValue: string;
}

const Input = ({handleChange, handleSubmit, taskValue}: Props) => {
    return (
        <Container>
            <Button data-testid="submitButton" onClick={handleSubmit}/>
            <InputContainer placeholder='Add new task...' onChange={handleChange} value={taskValue}/>
        </Container>

    )
}

export default Input;