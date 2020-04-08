import React from 'react';
import styled from 'styled-components';
import Typography from '../helpers/Typography';
import {PointsProgress} from './Progress';

const LoadingComponent = () => {
    return (
        <Container>
            <Typography fontSize='3.3rem' color='gradient'>
                Battleship
            </Typography>
            <PointsProgress size='12'/>
        </Container>
    );
};
const Container = styled.div`
    margin: 150px auto;
`;
export default LoadingComponent;