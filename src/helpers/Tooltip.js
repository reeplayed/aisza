import React from 'react';
import styled , {css} from 'styled-components';
import Tooltip from 'react-simple-tooltip';


const StyledTooltip = ({children, content}) => (
        <Tooltip 
            content={content}
            radius='8'
            style={{top: "10%", right: "3%"}}
            customCss={css`
                white-space: nowrap;
                font-size: 12px;
                padding: 5px;
                opacity: 0.7;
                font-family: 'Lobster', cursive;
                border-radius: 8px;
            `}
            >
                {children}

            </Tooltip>
    );

export default StyledTooltip;