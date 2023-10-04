import styled from "styled-components";

export const Container = styled.div`
    width: 50%;
    background-color: rgb(37, 39, 60);
    display: flex;
    align-items: center;
    flex-flow: column;
    min-height: 20rem;
    max-height: 40rem;
    padding-bottom: 7rem;
    border-radius: 5px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 16px;
    }

    &::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d4aa70;
        border-radius: 100px;
    }

`