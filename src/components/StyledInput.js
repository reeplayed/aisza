import React from 'react'
import styled from 'styled-components';

export default styled.input`
    width: 100%;
    height: 35px;
    margin-top: 5px;
    outline: none;
    border: 1px solid orange;
    border-radius: 50px;
    box-sizing: border-box;
    background-color: ${({theme})=> theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
    font-family: 'Lobster', cursive;
    padding: 0 20px;
    &:focus, &:hover{
        background-color: ${({theme})=> theme.colors.primary};
    }
`;