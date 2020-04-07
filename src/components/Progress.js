import React from 'react';
import styled, {keyframes} from 'styled-components';

const pointAnimation = keyframes`
  0% { transform: scale(1) }
  16% { transform: scale(1.7) }
  33% { transform: scale(1) }
  100% { transform: scale(1) }
`
const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    padding:7px 0;
`;
const AnimationInner = styled.div`
    animation: ${pointAnimation} 1.2s ${({delay})=> delay}s infinite;
    display: block-inline;
    height: ${({size})=> size ? size : 7}px;
    width: ${({size})=> size ? size : 7}px;
    border-radius: 50px;
    background: ${({theme})=>theme.colors.light};
    margin:2px;
`;
const linearAnimation = keyframes`
  0% { transform: translateX(0) }
  100% { transform: translateX(500%) }
`
const LinearProgressContainer = styled.div`
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 7px;
`
const LinearProgressWrapper = styled.div`
    position: relative;
    width:100%;
    height: 100%;
    background: ${({theme}) => theme.colors.gradient};
    &:after{
        animation: ${linearAnimation} 1.2s infinite;
        content: '';
        position: absolute;
        width:20%;
        height: 100%;
        border-radius: 50px;
        top:0;
        left:0;
        background: ${({theme}) => theme.colors.gradient};
    }
`
export const PointsProgress = ({size}) => {
    return (
        <Container>
            <AnimationInner size={size} delay='0'/>
            <AnimationInner size={size} delay='0.4'/>
            <AnimationInner size={size} delay='0.8'/>
        </Container>
    );
};
export const LinearProgress = () => {

    return (
        <LinearProgressContainer>
            <LinearProgressWrapper/>
            
        </LinearProgressContainer>
        
    )
}

