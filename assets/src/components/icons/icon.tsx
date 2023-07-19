import * as React from 'react';
import {iconFor} from './networks';
import {socialSvgContent} from './styles';
import {CSSProperties} from "@material-ui/core/styles/withStyles";

function getStyle(fgColor?: string): CSSProperties {
    return {
        ...socialSvgContent,
        fill: fgColor || 'transparent'
    };
}

function Icon({fgColor, networkKey, ...rest}: Props) {
    return (
        <g {...rest} className="social-svg-icon" style={getStyle(fgColor)}>
            <path d={iconFor(networkKey)}/>
        </g>
    )
}

interface Props {
    fgColor?: string,
    networkKey: string
}

export default Icon
