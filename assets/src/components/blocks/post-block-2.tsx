import * as React from "react";

import PostCard, {Post} from "../common/card-2";

import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";

import {Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    container: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gridGap: `${theme.spacing.unit + 10}px`,
        marginBottom: theme.spacing.unit + 20
    }
});

export default withStyles(styles)(
    class extends React.Component<Props> {
        render() {
            const {classes} = this.props;
            const {posts} = this.props;

            return (
                <section className={`content-block grid ${classes.container} spacing`}>
                    {
                        posts.map((post, index) => <PostCard key={`p-${index}`} post={post}/>)
                    }
                </section>
            );
        }
    }
);

interface Props extends WithStyles<typeof styles> {
    posts: Post[]
}