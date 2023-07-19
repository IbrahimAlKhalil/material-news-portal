import {CSSProperties} from "@material-ui/core/styles/withStyles";

export const socialIcon: CSSProperties = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    position: 'relative',
    overflow: 'hidden',
    verticalAlign: 'middle'
};

export const socialContainer: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
};

export const socialSvg: CSSProperties = {
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fillRule: 'evenodd'
};

export const socialSvgContent: CSSProperties = {
    msTransition: 'fill 170ms ease-in-out',
    OTransition: 'fill 170ms ease-in-out',
    MozTransition: 'fill 170ms ease-in-out',
    WebkitTransition: 'fill 170ms ease-in-out',
    transition: 'fill 170ms ease-in-out',
    fill: 'transparent'
};

export const socialSvgMask: CSSProperties = {
    ...socialSvgContent,
    fill: '#0f0b0b'
};
