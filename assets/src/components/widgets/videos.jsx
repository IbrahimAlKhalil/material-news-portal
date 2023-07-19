import * as React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
const styles = (theme) => createStyles({
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
export default withStyles(styles)(class extends React.Component {
    render() {
        const { classes } = this.props;
        const { data } = this.props;
        return (<React.Fragment>
                    <AppBar position="static" color="default">
                        <Typography className={classes.title} color="inherit" component="p">ভিডিও</Typography>
                    </AppBar>
                    <div className={classes.videos}>
                        {data.map((url, index) => <iframe className={classes.iframe} src={`https://youtube.com/embed/${url.split('=')[1]}`} key={`v-${index}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>)}

                    </div>
                </React.Fragment>);
    }
});
