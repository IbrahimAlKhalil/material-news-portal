import * as React from 'react';

import Background from './background';
import {keyFor} from './networks';
import {socialIcon, socialContainer, socialSvg} from './styles';

import Icon from './icon';
import Mask from './mask';

import {CSSProperties} from "@material-ui/core/styles/withStyles";

function getNetworkKey(props: { network?: string, url: string }) {
    return props.network || keyFor(props.url);
}

function SocialIcon(props: Props) {
    const {url, network, bgColor, fgColor, className, label, ...rest} = props;
    const networkKey = getNetworkKey({url, network});

    return (
        <a
            {...rest}
            href={url}
            className={'social-icon' + (!!className ? ' ' + className : '')}
            style={{...socialIcon, ...props.style}}
            aria-label={label || networkKey}
        >
            <div className="social-container" style={socialContainer}>
                <svg className="social-svg" style={socialSvg} viewBox="0 0 64 64">
                    <Background/>
                    <Icon networkKey={networkKey} fgColor={fgColor}/>
                    <Mask networkKey={networkKey} bgColor={bgColor}/>
                </svg>
            </div>
        </a>
    );
}

interface Props {
    className?: string
    bgColor?: string
    fgColor?: string
    label?: string
    network?: string
    url: string
    style?: CSSProperties
}


export default SocialIcon
