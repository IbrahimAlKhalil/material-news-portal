import * as React from "react";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import { postDate } from "../../modules/localizer";
import CommentReply from "./comment-reply";
const styles = (theme) => createStyles({
    wrapper: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 5
    },
    userIcon: {
        width: 40
    },
    authorNdate: {
        marginLeft: theme.spacing.unit * 2,
        whiteSpace: 'nowrap'
    },
    author: {
        fontWeight: 'bold'
    },
    content: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        fontSize: '1rem'
    },
    subComment: {
        marginLeft: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 2,
    }
});
export default withStyles(styles)(class extends React.Component {
    render() {
        const { comment } = this.props;
        const { classes } = this.props;
        const CommentTemplate = ({ comment, sub }) => (<div className={sub ? classes.subComment : ''}>
                <div className="flex">
                    <div>
                        <img className={classes.userIcon} src={comment.avatar} alt={comment.author}/>
                    </div>
                    <div className={classes.authorNdate}>
                        <Typography className={classes.author}>{comment.author}</Typography>
                        <Typography>{postDate(comment.date)}</Typography>
                    </div>
                </div>
                <Typography className={classes.content}>{comment.comment}</Typography>
            </div>);
        return (<div className={classes.wrapper} id={`comment-${comment.id}`}>
                <CommentTemplate comment={comment}/>
                {comment.children.length ? comment.children.map((subComment, index) => <CommentTemplate comment={subComment} key={`s-${index}`} sub/>) : null}
                <CommentReply id={comment.id} postId={this.props.postId}/>
            </div>);
    }
});
