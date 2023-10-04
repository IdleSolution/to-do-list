import List from "../List";
import React, { useEffect, useState } from 'react';
import { Container } from "./styles";
import Input from "../Task/Input/Input";
import { TaskInterface } from "../types/types";
import fetcherInstance from "../utils/Fetcher";
import { Loader } from "../Loader/Loader";

const Homepage = () => {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const tasksResponse = await fetcherInstance.fetchData<TaskInterface[]>('/task');
            setTasks(tasksResponse);
            setLoading(false);
        })()
    }, [])

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value);
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if(newTask.length > 0) {
            setTasks([...tasks, {id: 0, content: newTask, done: false}]);
            await fetcherInstance.postData<TaskInterface>('/task', {
                content: newTask
            });
            setNewTask('');
        }
    }

    return (
        <Container onSubmit={handleSubmit}>
            {loading && (
                <Loader />
            )}
            {!loading && (
                <>
                    <Input handleChange={handleChange} handleSubmit={handleSubmit} taskValue={newTask}/>
                    <List tasks={tasks}/>
                </>
            )}

        </Container>
    )
}

export default Homepage;