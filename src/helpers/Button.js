import styled from 'styled-components';

export default styled.button`
  padding: ${({ padding }) => (padding ? padding : '5px 20px')};
  width: ${({ width }) => (width ? width : '100%')};
  border: 1px solid orange;
  outline: none;
  border-radius: 50px;
  margin: ${({ margin }) => margin};
  background: ${({ background, theme }) => {
    switch (background) {
      case 'primary':
        return theme.colors.primary;
      case 'light':
        return theme.colors.light;
      case 'button_gradient':
        return theme.colors.button_gradient;
      default:
        return theme.colors.dark;
    }
  }};
  cursor: pointer;
  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.2),
    0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
