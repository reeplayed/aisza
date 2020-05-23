import React from 'react';
import styled from 'styled-components';
import Button from '../helpers/Button';
import PropTypes from 'prop-types';

const SingleCell = ({item: {idx, name, hit, border}, click, show}) => {
    return (
        <Cell  
            index={idx} 
            onClick={()=>hit || border || show ? null : click(idx, name)} 
            hit={hit || border ? true : false} 
            border={border}
            show={show}
            name={name}
            >
            
                {(name && hit) || (name && show) ? (
                    
                        <Ship index={idx}/>
                    
                ): !name && hit ? (
                    <Mishit index={idx}/>  
                ) : null}
        
        </Cell>
    );
};

SingleCell.defaultProps = {
    item: {
        idx: 0,
        name: false
    },
}

const Cell = styled.div`
    position: relative;
    display: flex;
    justify-content:center;
    align-items:center;
    background-color: ${({theme})=>theme.colors.dark};
    margin: 1px;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid rgba(255, ${({index})=>index*1.65} ,0);
    border-radius: 8px;
    cursor: pointer;
    transition: all .4s;
    opacity: ${({border, show, name})=> border || (show && !name) ? '0.4' : '1'};

    &:hover{
        opacity: ${({hit})=> !hit && '0.6'};
    }
    @media(max-width: 520px){
        width: 25px;
        height: 25px;
    }
`;
const Ship = styled.span`
    position: relative;
    display: block;
    height: 100%;
    width: 100%;

    &:before, &:after{
        content: '';
        position: absolute;
        background-color: rgba(255, ${({index})=>index*1.65} ,0);
        height: 3px;
        width: 90%;
        margin: 0 5%;
        border-radius: 50px;
        top:50%;
        
    }
    &:after{
        transform: translateY(-50%) rotate(-45deg);
    }
    &:before{
        transform: translateY(-50%) rotate(45deg);
    }
`;
const Mishit = styled.span`
    display: block;
    background-color: rgba(255, ${({index})=>index*1.65} ,0);
    height:28%;
    width:28%;
    border-radius:50px;
`;

export default SingleCell;