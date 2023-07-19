import * as React from "react";
import Fade from "@material-ui/core/Fade/Fade";
import Fallback from "./layout/fallback";
import createStyles from "@material-ui/core/styles/createStyles";
import {Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";

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
    }
});

export default withStyles(styles)(
    class extends React.Component<Props> {

        render() {
            const {data} = this.props;
            const {classes} = this.props;

            if (!data) {
                return <Fallback className="spacing-right spacing-left" height="100vh"
                                 suspense={false}
                                 progress={true}/>;
            }

            return (
                <Fade in={true}>
                    <section className={`spacing-right-md spacing-left-md ${classes.section}`}>
                        <Typography variant="h1" className={classes.title}>{data.title}</Typography>
                        <article className={classes.article} dangerouslySetInnerHTML={{__html: data.content}}/>
                    </section>
                </Fade>
            );
        }
    }
);

interface Props extends WithStyles<typeof styles> {
    data: Post
}

interface Post extends Response {
    title: string
    content: string
}