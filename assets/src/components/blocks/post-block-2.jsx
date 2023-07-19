import * as React from "react";
import PostCard from "../common/card-2";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
const styles = (theme) => createStyles({
    container: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gridGap: `${theme.spacing.unit + 10}px`,
        marginBottom: theme.spacing.unit + 20
    }
});
export default withStyles(styles)(class extends React.Component {
    render() {
        const { classes } = this.props;
        const { posts } = this.props;
        return (<section className={`content-block grid ${classes.container} spacing`}>
                    {posts.map((post, index) => <PostCard key={`p-${index}`} post={post}/>)}
                </section>);
    }
});
