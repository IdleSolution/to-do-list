import React from 'react';
import { Container } from './styles';
import { TaskInterface } from '../types/types';

interface Props {
    task: TaskInterface;
}

const Task = ({task}: Props) => {
    return (
        <Container>
            {task.content}
        </Container>
    )
}

export default Task;