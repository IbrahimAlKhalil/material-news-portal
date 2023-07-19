import * as React from "react";
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography/Typography";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Button from "@material-ui/core/Button/Button";

import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";

import {Theme} from "@material-ui/core";
import {PostCommon} from "../../typings";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import {Link} from "react-router-dom";
import {enNumberToBn} from "../../modules/localizer";

const styles = (theme: Theme) => createStyles({
    title: {
        fontSize: '1.3rem',
        margin: '10px 0'
    },
    para: {
        fontSize: '1rem'
    },
    count: {
        fontSize: '1rem'
    },
    icon: {
        padding: theme.spacing.unit + 2
    },
    iconBtn: {
        marginLeft: 10
    },
    tooltip: {
        fontSize: '.9rem'
    },
    action: {
        alignSelf: "flex-end",
        width: '100%'
    },
    img: {
        maxHeight: 150
    }
});

export default withStyles(styles)(
    class extends React.Component<Props> {
        render() {
            const {props} = this;
            const {classes} = props;
            const {post} = props;

            return (
                <Card className="flex flex-wrap">
                    <CardActionArea
                        component={({innerRef, ...props}) => <Link {...props} to={`/${post.slug}`}/>}>
                        <CardMedia image={post.image} component="img" className={classes.img}/>
                        <CardContent>
                            <Typography variant="h2" className={classes.title}>{post.title}</Typography>
                            <Typography component="p" className={classes.para}
                                        dangerouslySetInnerHTML={{__html: post.excerpt}}/>
                            {/*<Button color="primary">আরও পড়ুন</Button>*/}
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={`flex justify-content-center ${classes.action}`}>
                        <div className="flex align-items-center justify-content-center">
                            <div className={`${classes.icon} flex justify-content-center align-items-center`}>
                                <RemoveRedEye color="primary"/>
                            </div>
                            <Typography component="span" color="default"
                                        className={classes.count}>{enNumberToBn(post.views.toString()) || '০'}</Typography>
                            <div className={classes.icon}>
                                <ShareIcon color="primary"/>
                            </div>
                            <Typography component="span" color="default"
                                        className={classes.count}>{enNumberToBn(post.shares.toString()) || '০'}</Typography>
                            <div className={classes.icon}>
                                <CommentIcon color="primary"/>
                            </div>
                            <Typography component="span" color="default"
                                        className={classes.count}>{enNumberToBn(post.comments.toString()) || '০'}</Typography>
                        </div>
                    </CardActions>
                </Card>
            );
        }
    }
);

interface Props extends WithStyles<typeof styles> {
    post: Post
}

export interface Post extends PostCommon {
    image: string
    excerpt: string
    comments: number
    views: number
    shares: number
}