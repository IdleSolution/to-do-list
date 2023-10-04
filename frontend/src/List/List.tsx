import React from 'react';
import { Container } from './styles';
import Task from '../Task/Task';
import { TaskInterface } from '../types/types';

interface Props {
    tasks: TaskInterface[];
}

const List = ({tasks}: Props) => {

    return (
        <Container>
            {tasks.map(task => (
                <Task task={task} key={task.id}/>
            ))}
        </Container>
    )
}

export default List;