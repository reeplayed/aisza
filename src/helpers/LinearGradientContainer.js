import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : ''};
  margin: auto;

  height: 100%;
  position: relative;
  padding: ${({ padding }) => (padding ? padding : '2% 1em')};
  box-sizing: border-box;

  color: #fff;
  background: #222f3e;
  background-clip: padding-box; /* !importanté */
  border: solid 2px transparent; /* !importanté */
  border-radius: 1em;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    background: linear-gradient(to right, red, orange);
    box-shadow: 0px 8px 11px -5px rgba(0, 0, 0, 0.2),
      0px 17px 26px 2px rgba(0, 0, 0, 0.14),
      0px 6px 32px 5px rgba(0, 0, 0, 0.12);
  }
`;
