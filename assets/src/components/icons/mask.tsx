import * as React from 'react';

import {colorFor, maskFor} from './networks';
import {socialSvgMask} from './styles';

function getStyle({bgColor, networkKey}: Props) {
    return {
        ...socialSvgMask,
        fill: bgColor || colorFor(networkKey)
    };
}

function Mask({bgColor, networkKey, ...rest}: Props) {
    return (
        <g
            {...rest}
            className="social-svg-mask"
            style={getStyle({bgColor, networkKey})}
        >
            <path d={maskFor(networkKey)}/>
        </g>
    )
}

interface Props {
    bgColor?: string
    networkKey: string
}

export default Mask
