import * as React from 'react';
import { colorFor, maskFor } from './networks';
import { socialSvgMask } from './styles';
function getStyle({ bgColor, networkKey }) {
    return {
        ...socialSvgMask,
        fill: bgColor || colorFor(networkKey)
    };
}
function Mask({ bgColor, networkKey, ...rest }) {
    return (<g {...rest} className="social-svg-mask" style={getStyle({ bgColor, networkKey })}>
            <path d={maskFor(networkKey)}/>
        </g>);
}
export default Mask;
