import * as React from 'react';
import Background from './background';
import { keyFor } from './networks';
import { socialIcon, socialContainer, socialSvg } from './styles';
import Icon from './icon';
import Mask from './mask';
function getNetworkKey(props) {
    return props.network || keyFor(props.url);
}
function SocialIcon(props) {
    const { url, network, bgColor, fgColor, className, label, ...rest } = props;
    const networkKey = getNetworkKey({ url, network });
    return (<a {...rest} href={url} className={'social-icon' + (!!className ? ' ' + className : '')} style={{ ...socialIcon, ...props.style }} aria-label={label || networkKey}>
            <div className="social-container" style={socialContainer}>
                <svg className="social-svg" style={socialSvg} viewBox="0 0 64 64">
                    <Background />
                    <Icon networkKey={networkKey} fgColor={fgColor}/>
                    <Mask networkKey={networkKey} bgColor={bgColor}/>
                </svg>
            </div>
        </a>);
}
export default SocialIcon;
