import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import Task from '../Task/Task';
import { TaskInterface } from '../types/types';
import fetcherInstance from '../utils/Fetcher';
import { Loader } from '../Loader/Loader';

const List = () => {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const tasksResponse = await fetcherInstance.fetchData<TaskInterface[]>('/task');
            setTasks(tasksResponse);
            setLoading(false);
        })()
    }, [])

    return (
        <Container>
            {loading && (
                <Loader />
            )}
            {!loading && (
                <>
                    {tasks.map(task => (
                        <Task task={task}/>
                    ))}
                </>
            )}

        </Container>
    )
}

export default List;