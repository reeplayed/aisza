import React from 'react';
import styled from 'styled-components';
import GradientContainer from '../helpers/LinearGradientContainer'

const LabelContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 10%;
    right: -13%; 
`
const Digit = styled.span`
    font-family: 'Lobster', cursive;
    display: block;
    font-size: 1.2em;
    color: ${({theme, sunk})=>sunk ? theme.colors.light};

`;
const VerticalDigit = styled(Digit)`
    transform: rotate(90deg);
    margin: 10px 0;
`;

const ShipsLabel = () => {
    return (
        <LabelContainer>
            <GradientContainer flexDirection='column' justify='space-around'>
                <VerticalDigit>
                    Ships
                </VerticalDigit>
                
            </GradientContainer>
        </LabelContainer>
    );
};

export default ShipsLabel;