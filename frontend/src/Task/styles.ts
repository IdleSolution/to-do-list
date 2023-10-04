import styled from "styled-components";


export const Container = styled.div`
    width: 100%;
    border-bottom: 1px solid rgb(54, 54, 71);
    color: rgb(108, 108, 117);
    padding: 2rem 7rem;
    font-size: 2rem;
    font-weight: bold;
    position: relative;
`

export const Button = styled.div<{ isDone: boolean }>`
    width: 30px;
    height: 30px;
    border-radius: 50%; 
    border: ${props => props.isDone ? 'none' : '1px solid rgb(108, 108, 117);'};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 2%;
    transform: translate(0, -50%);
    cursor: pointer;
    background-color: ${props => props.isDone ? '#00C6C2' : 'transparent'};
`

export const Text = styled.p<{ isDone: boolean }>`
    font-size: 2rem;
    text-decoration: ${props => props.isDone ? 'line-through' : 'none'};
`

export const IconContainer = styled.div`
    width: 10px;
    height: 10px;
    position: absolute;
    top: 40%;
    transform: translate(0, -40%);
    right: 10%;
    cursor: pointer;
`
