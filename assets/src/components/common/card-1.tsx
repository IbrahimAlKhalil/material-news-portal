import * as React from "react";
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography/Typography";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";

import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";

import {Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import {PostCommon} from "../../typings";
import Watch from "@material-ui/icons/WatchLater";
import {Link} from "react-router-dom";
import {enNumberToBn, postDate} from "../../modules/localizer";

const styles = (theme: Theme) => createStyles({
    heading: {
        margin: '10px 0 8px 0'
    },
    img: {
        width: '100%',
        float: 'left',
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        borderRadius: theme.shape.borderRadius,
        maxHeight: 300
    },
    bigCardImg: {
        [theme.breakpoints.up('md')]: {
            width: 440
        }
    },
    para: {
        fontSize: '1.2rem'
    },
    /*  actions: {
          background: fade(theme.palette.background.default, 0.6)
      },*/
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
    categoryContainer: {
        padding: 20
    },
    category: {
        marginRight: 20
    },
    card: {
        flexDirection: 'column'
    },
    anchor: {
        color: '#000',
        textDecoration: 'none'
    }
});

export default withStyles(styles)(
    class extends React.Component<Props> {
        render() {
            const {props} = this;
            const {classes} = props;
            const {post} = props;

            if (!post) {
                return null;
            }

            const date = new Date(post.date);

            return (
                <Card className={`${props.className} ${classes.card} flex justify-content-between`}>
                    <CardContent>
                        <Typography variant={props.bigCard ? 'h1' : 'h2'}
                                    className={classes.heading}>
                            <Link className={classes.anchor} to={`/${post.slug}`}>{post.title}</Link>
                        </Typography>
                        <div className={`${classes.categoryContainer} flex align-items-center`}>
                            {
                                post.categories.map((category, index) => (
                                    <Button key={`c-${index}`} className={classes.category}
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            component={({innerRef, ...props}) => <Link
                                                to={`/category/${category.slug}/`} {...props}/>}>
                                        {category.name}
                                    </Button>
                                ))
                            }

                            <Watch color="action"/>
                            &nbsp;
                            <a href={`/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
                               className="link-primary">
                                <time dateTime={''}>{postDate(post.date)}</time>
                            </a>
                        </div>
                        <img src={post.image} alt={post.alt ? post.alt : post.title}
                             className={classes.img + (props.bigCard ? ' ' + classes.bigCardImg : '')}/>
                        <Typography component="p" className={`${classes.para} clear-fix`}>
                            {post.excerpt}...
                        </Typography>
                    </CardContent>
                    <CardActions className="flex justify-content-between">
                        <div className="flex align-items-center">
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
                        <div className="spacer-left"/>
                        <Button
                            component={({innerRef, ...props}) => <Link {...props} to={`/${post.slug}`}/>}
                            color="primary" variant="outlined">আরও পড়ুন</Button>
                    </CardActions>
                </Card>
            );
        }
    }
);

interface Props extends WithStyles<typeof styles> {
    post: Post,
    bigCard?: boolean
    className?: string
}

export interface Post extends PostCommon {
    date: string
    image: string
    alt: string
    excerpt: string
    categories: Category[]
    comments: number
    views: number
    shares: number
}

export interface Category {
    slug: string
    name: string
}