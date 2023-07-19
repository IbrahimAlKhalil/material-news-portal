import * as React from "react";

import "react-image-gallery/styles/css/image-gallery-no-icon.css";

import Paper from "@material-ui/core/Paper/Paper";
import Fab from "@material-ui/core/Fab/Fab";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Fullscreen from "@material-ui/icons/Fullscreen";
import ImageGallery, {ReactImageGalleryItem} from 'react-image-gallery';
import Image from "../common/gallery-item";

import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";

const styles = () => createStyles({
    root: {
        overflow: 'hidden',
        position: 'relative',
        '& .image-gallery': {
            width: '100%'
        }
    },
    gallery: {
        width: '100%'
    },
    absolute: {
        position: 'absolute',
        zIndex: 1
    },
    right: {
        right: 10
    },
    left: {
        left: 10
    },
    full: {
        bottom: 10,
    },
    navBtn: {
        top: '50%',
        transform: 'translateY(-50%)'
    }
});

export default withStyles(styles)(
    class extends React.Component<Props, State> {

        renderRightNav = (onClick: React.MouseEventHandler<HTMLElement>): React.ReactNode => {
            const {classes} = this.props;

            return (
                <Fab onClick={onClick} className={`${classes.navBtn} ${classes.right} ${classes.absolute}`}
                     color="secondary"
                     size="small">
                    <ArrowRight color="inherit"/>
                </Fab>
            );
        };

        renderLeftNav = (onClick: React.MouseEventHandler<HTMLElement>): React.ReactNode => {
            const {classes} = this.props;

            return (
                <Fab onClick={onClick} className={`${classes.navBtn} ${classes.left}  ${classes.absolute}`}
                     color="secondary"
                     size="small">
                    <ArrowLeft color="inherit"/>
                </Fab>
            );
        };

        renderFullscreenButton = (onClick: React.MouseEventHandler<HTMLElement>): React.ReactNode => {
            const {classes} = this.props;

            return (
                <Fab onClick={onClick} size="medium" color="secondary"
                     className={`${classes.absolute} ${classes.full} ${classes.right}`}>
                    <Fullscreen color="inherit"/>
                </Fab>
            );
        };

        renderItem = (item: ReactImageGalleryItem): React.ReactNode => {
            return <Image item={item}/>;
        };


        render() {
            const {classes} = this.props;
            const images = this.props.galleryItems.map(item => ({
                original: item.original,
                thumbnail: item.thumbnail,
                originalAlt: item.alt,
                thumbnailAlt: item.alt
            }));

            const galleryOptions = {
                lazyLoad: true,
                renderRightNav: this.renderRightNav,
                renderLeftNav: this.renderLeftNav,
                renderFullscreenButton: this.renderFullscreenButton,
                renderItem: this.renderItem,
                showPlayButton: false
            };

            return (
                <Paper className={`content-block spacing flex flex-wrap-md ${classes.root}`} component="section">
                    <ImageGallery items={images} {...galleryOptions}/>
                </Paper>
            );
        }
    });

interface Props extends WithStyles<typeof styles> {
    galleryItems: GalleryItem[]
}

interface State {
    index: number
}

export interface GalleryItem {
    original: string
    thumbnail: string
    alt: string
}