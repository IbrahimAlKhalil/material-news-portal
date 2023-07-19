import * as React from "react";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import ReplyIcon from "@material-ui/icons/Reply";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import {FormEvent} from "react";
import Fade from "@material-ui/core/Fade/Fade";
import Typography from "@material-ui/core/Typography/Typography";

const styles = (theme: Theme) => createStyles({
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

export default withStyles(styles)(class extends React.Component<Props, State> {
    form: HTMLFormElement | null = null;
    timeout: number | undefined;

    state = {
        show: false,
        commented: false,
        replyMessage: '',
        showMessage: false,
        error: false
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                {!this.state.commented && <div>
                    <Button color="primary" size="small" variant="outlined" onClick={this.toggleReply}>
                        <ReplyIcon fontSize="small" color="inherit"/> উত্তর দিন
                    </Button>
                    {
                        this.state.show &&
                        <form action={window.saharaRoutes.comment} method="post" onSubmit={this.storeComment}
                              ref={form => this.form = form}>
                            <input type="hidden" name="post-id" value={this.props.postId}/>
                            <input type="hidden" name="comment-id" value={this.props.id}/>
                            <TextField
                                className={classes.textField}
                                required
                                label="নাম"
                                margin="dense"
                                name="name"
                            />
                            <TextField
                                className={classes.textField}
                                type="email"
                                required
                                label="ইমেইল"
                                autoComplete="email"
                                margin="dense"
                                name="email"
                            />
                            <TextField
                                className={classes.textField}
                                type="textarea"
                                required
                                label="মন্তব্য"
                                margin="dense"
                                multiline
                                rows={5}
                                name="comment"
                            />
                            <Button color="primary" variant="contained" type="submit">জমা দিন</Button>
                        </form>
                    }
                </div>}
                {
                    this.state.showMessage && <Fade in={this.state.showMessage} timeout={500}>
                        <div
                            className={classes.messageBox + ' ' + (this.state.error ? classes.error : classes.success)}>
                            <Typography>{this.state.replyMessage}</Typography>
                        </div>
                    </Fade>
                }
            </React.Fragment>
        );
    }

    toggleReply = () => {
        this.setState(state => ({
            show: !state.show
        }));
    };

    storeComment = async (event: FormEvent) => {
        event.preventDefault();
        console.log('submitted');

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
                })
            }, 5000);
        }
    }
});

export function storeComment(form: HTMLFormElement) {
    const formData = new FormData(form);

    return new Promise<ReplyResponse>(async resolve => {
        const response = await fetch(window.saharaRoutes.comment, {
            method: 'POST',
            body: formData
        });

        const data = response.json();

        resolve(data);
    });
}


interface Props extends WithStyles<typeof styles> {
    id: number
    postId: number
}

interface State {
    show: boolean
    commented: boolean,
    replyMessage: string
    showMessage: boolean
    error: boolean
}

interface ReplyResponse {
    success: boolean
    message: string
}