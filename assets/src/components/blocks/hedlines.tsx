import * as React from "react";

import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Fiber from "@material-ui/icons/FiberManualRecord";

import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";

import {Theme} from "@material-ui/core";
import {Link} from "react-router-dom";
import {PostCommon} from "../../typings";

const styles = (theme: Theme) => createStyles({
    '@keyframes marquee': {
        from: {transform: 'translate(0, 0)'},
        to: {transform: 'translate(-100%, 0)'}
    },
    root: {
        height: 50,
        overflow: 'hidden',
        borderRadius: 0,
        [theme.breakpoints.up('md')]: {
            borderRadius: theme.shape.borderRadius
        }
    },
    title: {
        position: 'relative',
        zIndex: 1,
        padding: theme.spacing.unit,
        background: theme.palette.primary.main,
        textShadow: '0 0 1px rgba(0, 0, 0, .1)',
        color: '#fff',
        fontWeight: 'bold',
        height: '100%'
    },
    marquee: {
        paddingLeft: '100%',
        animationName: 'marquee',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        '&:hover': {
            animationPlayState: 'paused'
        }
    },
    marqueText: {
        '& a': {
            margin: '0 8px',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline'
            }
        }
    },
    dot: {
        fontSize: 15,
        margin: 'auto'
    }
});

export default withStyles(styles)(
    class extends React.Component<Props> {

        render() {
            const {classes} = this.props;
            const {data} = this.props;
            const {posts} = data;
            const charLength: number = posts.map(item => item.title.length).reduce((a, b) => a + b);

            return (
                <Paper component="section"
                       id="section-headlines"
                       className={classes.root + ' flex align-items-center spacing-bottom-sm spacing-right-md spacing-left-md'}>
                    <div
                        className={classes.title + ' flex align-items-center justify-content-center headline-title'}>{data.title}</div>
                    <div className={classes.marquee} style={{animationDuration: `${charLength * 150}ms`}}>
                        <div className={classes.marqueText + ' flex'}>
                            {
                                posts.map((item, index) => (
                                    <React.Fragment key={`h-${index}`}>
                                        <Typography component={({innerRef, ...props}) => <Link
                                            to={`/${item.slug}`} {...props}/>}
                                        >{item.title}</Typography>
                                        <Fiber color="action" className={classes.dot}/>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </div>
                </Paper>
            );
        }
    });

interface Props extends WithStyles<typeof styles> {
    data: HeadlinesBlock
}

export interface HeadlinesBlock {
    title: string // Block Title
    posts: PostCommon[]
}