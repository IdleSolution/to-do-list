import React from 'react';
import { Container } from './styles';
import Task from '../Task/Task';
import { TaskInterface } from '../types/types';

interface Props {
    tasks: TaskInterface[];
    markTaskAsDone: (taskId: number) => void;
    removeTask: (taskId: number) => void;
}

const List = ({tasks, markTaskAsDone, removeTask}: Props) => {

    return (
        <Container>
            {tasks.map(task => (
                <Task task={task} key={task.id} markTaskAsDone={markTaskAsDone} removeTask={removeTask}/>
            ))}
        </Container>
    )
}

export default List;