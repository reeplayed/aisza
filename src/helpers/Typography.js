import styled from 'styled-components'

const Styled = styled.h4`
    font-family: 'Lobster', cursive;
    display: block;
    margin:0;
    text-align: center;
    
`

export default styled(Styled).attrs(props => ({
    as: props.type ? props.type : 'h5'
  }))`
    font-size: ${({fontSize})=> fontSize ? fontSize : '1em'};
    ${({color, theme})=> {
        switch(color){
            case 'primary':
                return 'color: '+ theme.colors.primary
            case 'light':
                return 'color: '+ theme.colors.light
            case 'dark':
                return 'color: '+ theme.colors.dark
            default:
                return `
                background: -webkit-linear-gradient(yellow, red, purple); 
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                `
        }
    }};
  `