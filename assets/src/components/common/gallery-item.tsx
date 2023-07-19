import * as React from "react";
import {ReactImageGalleryItem} from "react-image-gallery";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import createStyles from "@material-ui/core/styles/createStyles";
import Typography from "@material-ui/core/Typography/Typography";

const styles = (theme: Theme) => createStyles({
    notLoaded: {
        minHeight: 400,
        position: 'relative',
        overflow: 'hidden'
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 2
    },
    thumb: {
        filter: 'blur(8rem)'
    },
    alt: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        background: 'linear-gradient(to right, rgba(255, 255, 255, 0.72), transparent)',
        textShadow: '0 0 15px #fff, 0 0 15px #fff, 0 0 15px #ffffff',
        padding: 10,
        fontSize: '1rem',
        fontWeight: 'bold'
    }
});

export default withStyles(styles)(
    class extends React.Component<Props, State> {

        state = {
            notLoaded: true
        };

        handleLoad = () => {
            this.setState({
                notLoaded: false
            });
        };

        render() {
            const {item} = this.props;
            const {classes} = this.props;
            const divClass: string = this.state.notLoaded ? classes.notLoaded : '';

            return (
                <div className={`image-gallery-image ${divClass}`}>
                    <img src={item.original} onLoad={this.handleLoad} alt={item.originalAlt}
                         hidden={this.state.notLoaded}/>
                    {item.originalAlt &&
                    <Typography component="p" className={`${classes.alt}`}>{item.originalAlt}</Typography>}
                    {
                        this.state.notLoaded &&
                        <React.Fragment>
                            <img src={item.thumbnail} alt={item.thumbnailAlt} className={classes.thumb}/>
                            <CircularProgress color="secondary" className={classes.progress}/>
                        </React.Fragment>
                    }
                </div>
            );
        }
    }
);

interface Props extends WithStyles<typeof styles> {
    item: ReactImageGalleryItem
}

interface State {
    notLoaded: boolean
}