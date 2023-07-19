import * as React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {Widget} from "../../typings";
import Typography from "@material-ui/core/Typography/Typography";
import {Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    title: {
        fontSize: '1.5rem',
        padding: theme.spacing.unit - 3,
        textAlign: 'center'
    },
    iframe: {
        width: '100%',
        height: 'auto',
        [theme.breakpoints.up('md')]: {
            height: 250
        }
    },
    videos: {
        padding: theme.spacing.unit
    }
});

export default withStyles(styles)(
    class extends React.Component<Props> {
        render() {
            const {classes} = this.props;
            const {data} = this.props;

            return (
                <React.Fragment>
                    <AppBar position="static" color="default">
                        <Typography className={classes.title} color="inherit"
                                    component="p">ভিডিও</Typography>
                    </AppBar>
                    <div className={classes.videos}>
                        {
                            (data as string[]).map((url, index) => <iframe
                                className={classes.iframe}
                                src={`https://youtube.com/embed/${url.split('=')[1]}`} key={`v-${index}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>)
                        }

                    </div>
                </React.Fragment>
            );
        }
    });

interface Props extends WithStyles<typeof styles>, Widget {
    data?: string[]
}