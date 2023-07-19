import * as React from 'react'

import {socialSvgContent} from './styles';

function Background() {
    return (
        <g className="social-svg-background" style={socialSvgContent}>
            <circle cx="32" cy="32" r="31"/>
        </g>
    );
}

export default Background
