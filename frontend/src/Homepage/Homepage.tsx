import List from "./../List/List"
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
            setLoading(true);
            const createdTask = await fetcherInstance.postData<TaskInterface>('/task', {
                content: newTask
            });
            setTasks([{id: createdTask.id, content: createdTask.content, done: createdTask.done}, ...tasks]);
            setNewTask('');
            setLoading(false);
        }
    }

    const markTaskAsDone = async (taskId: number) => {
        const taskToMark = tasks.find((t) => t.id === taskId);
        if(!taskToMark?.done) {
            await fetcherInstance.patchData(`/task/${taskId}`);
            const newState = tasks.map(task => {
                if(task.id === taskId) {
                    return { ...task, done: true }
                }
    
                return task;
            })
    
            setTasks(newState);
        }

    }

    const removeTask = async (taskId: number) => {
        await fetcherInstance.deleteData(`/task/${taskId}`);
        const newState = tasks.filter(task => task.id !== taskId);
        setTasks(newState);
    }

    return (
        <Container onSubmit={handleSubmit}>
            {loading && (
                <Loader />
            )}
            {!loading && (
                <>
                    <Input handleChange={handleChange} handleSubmit={handleSubmit} taskValue={newTask}/>
                    <List tasks={tasks} markTaskAsDone={markTaskAsDone} removeTask={removeTask}/>
                </>
            )}

        </Container>
    )
}

export default Homepage;