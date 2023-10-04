import styled from "styled-components";

export const Container = styled.div`
    width: 50%;
    position: relative;
    margin-bottom: 3rem;

`

export const InputContainer = styled.input`
    width: 100%;
    padding: 3rem 7rem;
    background-color: rgb(37, 39, 60);
    border: none;
    color: rgb(108, 108, 117);
    font-size: 1.5rem;
    border-radius: 5px;

    &:focus {
        outline: none;
    }
`

export const Button = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%; 
    border: 1px solid rgb(108, 108, 117);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 2%;
    transform: translate(0, -50%);
    cursor: pointer;


    &::before {
        content: "";
        width: 10px;
        height: 2px;
        background-color: rgb(145, 144, 141);
        position: absolute;
    }

    &::after {
        content: "";
        width: 2px;
        height: 10px;
        background-color: rgb(145, 144, 141);
        position: absolute;
    }
`