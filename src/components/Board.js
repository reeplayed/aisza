import React, { useState } from 'react';
import SingleCell from './SingleCell'
import Label from './Label'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '../helpers/Typography';

const horizontalArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const verticalArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

const BoardContainer = styled.div`
    width: 420px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    display: flex;
    justify-content:center;
    align-items:center;
    margin-left: 30px;
    @media(max-width: 520px){
        width: 270px;
    }
`;
const Backdrop = styled.div`
    position:absolute;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    border-radius: 8px;
    display: ${({display})=>display ? 'flex' : 'none'} ;
    align-items: center;
    justify-content: center;
    z-index:2;
`;

const Board = ({uid, array, hit, show, move, mode, children, winner}) => {
    
    console.log(array, 'thc')

    const test = () => {
        console.log(array)
    }

    return(
            <BoardContainer>
                <Label chars={horizontalArray} row />
                <Label chars={verticalArray}  />
                {children}
                <Backdrop display={move || winner}>
                    <Typography fontSize='1.6rem' type='label' color='light'>
                        {winner===uid ? 'You win the battle.' : winner ? 'Your opponent win the battle.' : mode==='own' ? 'Your turn' : 'Waiting for opponent move.'}
                    </Typography>
                </Backdrop>    
                
                {array && array.map(item=> {
                    
                    return <SingleCell item={item} click={hit} show={show}/>
                })}
            </BoardContainer>
    );
};

Board.defaultProps = {
    array: [...Array(100)],
  }

export default Board;