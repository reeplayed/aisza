import React from 'react';
import styled from 'styled-components';
import GradientContainer from '../helpers/LinearGradientContainer'


const LabelContainer = styled.div`
    position: absolute;
    ${({row}) => row ? (`
        height: 10%;
        width: 100%;
        top: -13%; 
    `) : (`
        height: 100%;
        width: 10%;
        left: -13%; 
    `)} 
`
const Digit = styled.span`
    font-family: 'Lobster', cursive;
    display: block;
    font-size: 1.2em;
    color: ${({theme})=> theme.colors.light};
`;




const Label = ({chars, row}) => {
    return (
        
        <LabelContainer row={row} >
            <GradientContainer flexDirection={row ? 'row' : 'column'} justify={'space-around'}>
           
                {chars.map((char, index)=> (
                    
                        <Digit key= {index} >
                            {char}
                        </Digit>
                   
                ))}
               
            </GradientContainer>
        </LabelContainer>
            
    
    );
};

export default Label;