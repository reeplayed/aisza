import styled from 'styled-components';

export default styled.div`
    border: 1px solid orange;
    border-radius: 8px;
    
    width: 100%;
    padding: 5px 15px;
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    // background: ${({ theme }) => theme.colors.opacity_gradient};
    background: rgb(34, 47, 62, 0.5);
    ${({ pointer, theme }) =>
      pointer &&
      `cursor: pointer; 
        background:` + theme.colors.opacity_gradient};
`;
