import * as React from 'react';
import { iconFor } from './networks';
import { socialSvgContent } from './styles';
function getStyle(fgColor) {
    return {
        ...socialSvgContent,
        fill: fgColor || 'transparent'
    };
}
function Icon({ fgColor, networkKey, ...rest }) {
    return (<g {...rest} className="social-svg-icon" style={getStyle(fgColor)}>
            <path d={iconFor(networkKey)}/>
        </g>);
}
export default Icon;
