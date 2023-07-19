import * as React from "react";
import Fade from "@material-ui/core/Fade/Fade";
import Fallback from "./layout/fallback";
import createStyles from "@material-ui/core/styles/createStyles";
import {Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import {postDate} from "../modules/localizer";
import CommentSection from "../components/common/comments";
import Watch from "@material-ui/icons/WatchLater";

const styles = (theme: Theme) => createStyles({
    section: {
        background: '#fff',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing.unit * 2,
        boxShadow: '0 0 1px rgba(0, 0, 0, .1)',
        marginBottom: theme.spacing.unit * 2
    },
    title: {
        margin: `${theme.spacing.unit * 3}px 0 10px 0`,
    },
    article: {
        marginTop: theme.spacing.unit,
        fontSize: '1.3rem'
    },
    figure: {
        position: 'relative',
        margin: `${theme.spacing.unit}px 0`,
        overflow: 'hidden'
    },
    thumbnail: {
        width: '100%'
    },
    caption: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: theme.spacing.unit,
        background: 'linear-gradient(to right, rgba(255, 255, 255, 0.72), transparent)',
        fontSize: '1rem',
        fontWeight: 700,
    },
    date: {
        marginLeft: '1rem'
    },
    img: {
        marginRight: theme.spacing.unit + 5,
        '& img': {
            width: 35,
            marginRight: 10,
            borderRadius: '50%'
        }
    }
});

export default withStyles(styles)(
    class extends React.Component<Props> {
        timeOutId: number | undefined;

        state = {};

        render() {
            const {data} = this.props;
            const {classes} = this.props;

            if (!data) {
                return <Fallback className="spacing-right spacing-left" height="100vh"
                                 suspense={false}
                                 progress={true}/>;
            }

            if (!localStorage.getItem(`p-${data.id}`)) {
                this.timeOutId = window.setTimeout(() => {
                    localStorage.setItem(`p-${data.id}`, '1');
                    fetch(`${window.saharaRoutes.postView}/${data.id}`, {
                        method: 'POST'
                    });
                }, 20000);
            }

            return (
                <React.Fragment>
                    <Fade in={true}>
                        <section className={`spacing-right-md spacing-left-md ${classes.section}`}>
                            <Typography variant="h1" className={classes.title}>{data.title}</Typography>
                            <div className="flex justify-content-between align-items-center">
                                <div className={`${classes.date} flex align-items-center flex-wrap-md`}>
                                    <div className={`${classes.img} flex align-items-center justify-content-between`}>
                                        <img src={data.avatar}/>
                                        <span>{data['user_nicename']}</span>
                                    </div>
                                    <a href={`/articles/date/`} className="link-primary">
                                        <Watch color="action"/>
                                        &nbsp;
                                        <time dateTime={''}>{postDate(data.date)}</time>
                                    </a>
                                </div>

                                <div dangerouslySetInnerHTML={{__html: data.socialButtons}}/>
                            </div>
                            <figure className={classes.figure}>
                                <img className={classes.thumbnail}
                                     src={`${window.saharaData.storageUrl}/${data.thumbnail}`} alt={data.alt}
                                     title={data.thumbnailTitle}/>
                                <figcaption className={classes.caption}>{data.caption}</figcaption>
                            </figure>
                            <article className={classes.article} dangerouslySetInnerHTML={{__html: data.content}}/>
                        </section>
                    </Fade>
                    <CommentSection className={classes.section} id={data.id}/>
                </React.Fragment>
            );
        }

        componentWillUnmount() {
            this.timeOutId && window.clearTimeout(this.timeOutId);
        }
    }
);

interface Props extends WithStyles<typeof styles> {
    data: Post
}

interface Post extends Response {
    id: number
    title: string
    content: string
    date: string
    thumbnail: string
    thumbnailTitle: string
    alt: string
    caption: string,
    socialButtons: string
    avatar: string
    user_nicename: string
}