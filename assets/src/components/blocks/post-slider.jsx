import * as React from "react";
import SwipeableViews from 'react-swipeable-views';
import Paper from "@material-ui/core/Paper/Paper";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from "@material-ui/core/Fab/Fab";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { Link } from "react-router-dom";
const styles = (theme) => createStyles({
    root: {
        overflow: 'hidden',
        borderRadius: 0,
        [theme.breakpoints.up('md')]: {
            borderRadius: theme.shape.borderRadius
        },
        position: 'relative'
    },
    container: {
        position: 'relative'
    },
    img: {
        width: '100%',
        height: 360,
        objectFit: 'cover'
    },
    excerpt: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        background: 'linear-gradient(to right, rgba(255, 255, 255, 0.72), transparent)',
        borderBottom: `8px solid ${theme.palette.primary.main}`
    },
    text: {
        textShadow: '0 0 15px #fff, 0 0 15px #fff, 0 0 15px #fff',
        padding: '0 10px',
        color: '#000',
        textDecoration: 'none'
    },
    arrowRight: {
        position: 'absolute',
        top: '50%',
        right: theme.spacing.unit,
        transform: 'translateY(-50%)',
    },
    arrowLeft: {
        position: 'absolute',
        top: '50%',
        left: theme.spacing.unit,
        transform: 'translateY(-50%)'
    },
});
export default withStyles(styles)(class extends React.Component {
    constructor() {
        super(...arguments);
        this.springConfig = { duration: '0.8s', delay: '0s', easeFunction: 'ease-in-out' };
        this.animationId = 0;
        this.timeoutId = 0;
        this.slideCount = this.props.slides.length - 1;
        this.state = {
            index: 0
        };
        this.slide = () => {
            this.setState((state) => {
                const index = state.index === this.slideCount ? 0 : state.index + 1;
                return {
                    index: index
                };
            });
            this.timeoutId = window.setTimeout(() => {
                this.animationId = window.requestAnimationFrame(this.slide);
            }, 15000);
        };
        this.slideRight = () => {
            this.setState((state) => {
                const index = state.index === this.slideCount ? 0 : state.index + 1;
                return {
                    index: index
                };
            });
        };
        this.slideLeft = () => {
            this.setState((state) => {
                const index = state.index === 0 ? this.slideCount : state.index - 1;
                return {
                    index: index
                };
            });
        };
    }
    componentDidMount() {
        if (this.slideCount === -1) {
            return;
        }
        this.timeoutId = window.setTimeout(() => {
            this.animationId = window.requestAnimationFrame(this.slide);
        }, 15000);
    }
    componentWillUnmount() {
        window.clearTimeout(this.timeoutId);
        window.cancelAnimationFrame(this.animationId);
    }
    render() {
        const { classes } = this.props;
        const { slides } = this.props;
        if (this.slideCount === -1) {
            return null;
        }
        return (<Paper component="section" className={`${classes.root} content-block spacing-right-md spacing-left-md`}>
                    <SwipeableViews axis="x" index={this.state.index} autoPlay springConfig={this.springConfig}>
                        {slides.map((slide, index) => (<div key={`sl-${index}`} className={classes.container}>
                                    <img src={slide.image} alt={slide.alt ? slide.alt : slide.title} className={classes.img}/>
                                    <div className={classes.excerpt}>
                                        <h2>
                                            <Link className={classes.text} to={`/${slide.slug}`}>{slide.title}</Link>
                                        </h2>
                                        <p className={classes.text} dangerouslySetInnerHTML={{ __html: slide.excerpt }}/>
                                    </div>
                                </div>))}
                    </SwipeableViews>
                    <Fab color="secondary" size="small" className={classes.arrowLeft} onClick={this.slideLeft}>
                        <ArrowLeft />
                    </Fab>
                    <Fab color="secondary" size="small" className={classes.arrowRight} onClick={this.slideRight}>
                        <ArrowRight />
                    </Fab>
                </Paper>);
    }
});
