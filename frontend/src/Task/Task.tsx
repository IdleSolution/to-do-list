import React from 'react';
import { Button, Container, IconContainer, Text } from './styles';
import { TaskInterface } from '../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


interface Props {
    task: TaskInterface;
    markTaskAsDone: (taskId: number) => void;
    removeTask: (taskId: number) => void;
}

const Task = ({task, markTaskAsDone, removeTask}: Props) => {
    return (
        <Container>
            <Button data-testid="markAsDoneButton" onClick={() => markTaskAsDone(task.id)} isDone={task.done}/>
            <Text isDone={task.done}>{task.content}</Text>
            <IconContainer data-testid="removeTaskButton" onClick={() => removeTask(task.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </IconContainer>
        </Container>
    )
}

export default Task;