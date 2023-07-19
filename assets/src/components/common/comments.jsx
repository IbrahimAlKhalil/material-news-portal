import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Comment from "./comment";
import Typography from "@material-ui/core/Typography/Typography";
import Fallback from "../../pages/layout/fallback";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { enNumberToBn } from "../../modules/localizer";
import { storeComment } from "./comment-reply";
import Fade from "@material-ui/core/Fade/Fade";
const styles = (theme) => createStyles({
    commentSectionTitle: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    commentSectionTitleLeft: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
    },
    commentDisabledTitle: {
        color: '#888'
    },
    textField: {
        width: '100%',
    },
    messageBox: {
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
    },
    success: {
        background: 'rgba(103, 243, 131, 0.1)',
        border: '2px solid #45f383',
    },
    error: {
        background: 'rgba(243, 103, 103, 0.1)',
        border: '2px solid #e85353',
    }
});
export default withStyles(styles)(class extends React.Component {
    constructor() {
        super(...arguments);
        this.form = null;
        this.state = {
            data: null,
            commented: false,
            replyMessage: '',
            showMessage: false,
            error: false
        };
        this.storeComment = async (event) => {
            event.preventDefault();
            if (this.form) {
                const data = await storeComment(this.form);
                this.setState({
                    commented: data.success,
                    replyMessage: data.message,
                    showMessage: true,
                    error: !data.success
                });
                this.timeout = window.setTimeout(() => {
                    this.setState({
                        showMessage: false
                    });
                }, 10000);
            }
        };
    }
    render() {
        const { classes } = this.props;
        const className = this.props.className ? this.props.className : '';
        const { data } = this.state;
        if (!data) {
            return <Fallback height="200px" suspense={false} progress={true} className="spacing-right-md spacing-left-md"/>;
        }
        if (!data.commentsEnabled) {
            return <section className={`spacing-right-md spacing-left-md ${className}`}>
                    <Typography className={classes.commentSectionTitle + ' ' + classes.commentDisabledTitle}>মন্তব্য
                        নিষ্ক্রিয়।</Typography>
                </section>;
        }
        return (<section className={`spacing-right-md spacing-left-md ${className}`}>
                    {data.comments.length ? <Typography className={classes.commentSectionTitleLeft}>{enNumberToBn(data.comments.length.toString())} টি
                            মন্তব্য</Typography> : null}
                    {data.comments.map((comment, index) => <Comment comment={comment} key={`c-${index}`} postId={this.props.id}/>)}
                    {!this.state.commented &&
            <form action={window.saharaRoutes.comment} method="post" onSubmit={this.storeComment} ref={form => this.form = form}>
                            <Typography className={classes.commentSectionTitleLeft}>
                                মন্তব্য করুন
                            </Typography>
                            <input type="hidden" name="post-id" value={this.props.id}/>
                            <input type="hidden" name="comment-id" value={0}/>
                            <TextField className={classes.textField} required label="নাম" margin="dense" name="name"/>
                            <TextField className={classes.textField} type="email" required label="ইমেইল" autoComplete="email" margin="dense" name="email"/>
                            <TextField className={classes.textField} type="textarea" required label="মন্তব্য" margin="dense" multiline rowsMax={5} name="comment"/>
                            <Button color="primary" type="submit" variant="contained">জমা দিন</Button>
                        </form>}
                    {this.state.showMessage && <Fade in={this.state.showMessage} timeout={500}>
                            <div className={classes.messageBox + ' ' + (this.state.error ? classes.error : classes.success)}>
                                <Typography>{this.state.replyMessage}</Typography>
                            </div>
                        </Fade>}
                </section>);
    }
    componentDidMount() {
        const request = this.request = new XMLHttpRequest();
        request.open('GET', `${window.saharaRoutes.comments}/${this.props.id}`);
        request.onload = () => this.setState({
            data: JSON.parse(request.responseText)
        });
        request.send();
    }
    componentWillUnmount() {
        this.request && this.request.abort();
        this.timeout && window.clearTimeout(this.timeout);
    }
});
