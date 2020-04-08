import React from 'react';
import styled from 'styled-components';
import Button from '../helpers/Button';
import Link from '../helpers/StyledLink';
import Typography from '../helpers/Typography';
import {
    MenuIcon,
    LogoutIcon, 
    GameIcon, 
    AcceptIcon, 
    RemoveIcon, 
    BinIcon
} from '../svg/Icons';

const ButtonWrapper = styled.div`
    position:absolute;
    top: 10px;
    left: 10px;
    width: 100px;
`;
const Wrapper = styled.button`
    border: 0;
    border-radius: 50px;
    outline: none;
    
    height: 30px;
    background: inherit;
    cursor: pointer;
   
`;

export const MenuButton = () => {
    return (
        <ButtonWrapper>
            <Link to='/'>
                <Button padding='2px 5px' >
                    <MenuIcon/>
                </Button>
            </Link>
        </ButtonWrapper>
    );
};

export const LogoutButton = ({onclick}) => {
    return (
        <ButtonWrapper >
                <Button padding='0 5px' onClick={onclick}>
                    <LogoutIcon/>
                </Button>
        </ButtonWrapper>
    );
};

export const GameRequestButton = ({onclick}) => (
    <Wrapper onClick={onclick}>
        <GameIcon/>
    </Wrapper>
)

export const AcceptButton = ({onclick}) => (
    <Wrapper onClick={()=>onclick(true)}>
        <AcceptIcon/>
    </Wrapper>
)

export const RemoveButton = ({onclick}) => (
    <Wrapper onClick={()=>onclick(false)}>
        <RemoveIcon/>
    </Wrapper>
)

export const BinButton = ({onclick}) => (
    <Wrapper onClick={onclick}>
        <BinIcon/>
    </Wrapper>
)