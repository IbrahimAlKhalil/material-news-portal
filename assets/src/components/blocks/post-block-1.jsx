import PostCard from "../common/card-1";
import * as React from "react";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = (theme) => createStyles({
    smallCard: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50%'
        }
    }
});
export default withStyles(styles)(class extends React.Component {
    render() {
        const { posts } = this.props;
        const { classes } = this.props;
        if (!posts.length) {
            return null;
        }
        return (<section className="content-block spacing">
                    <PostCard post={posts[0]} bigCard/>
                    <div className="flex flex-wrap-md spacing-top">
                        {[posts[1], posts[2]].map((post, index) => (<PostCard key={`c-${index}`} post={post} className={`${classes.smallCard}${index === 0 ? ' spacing-right-md' : ''} spacing-bottom`}/>))}
                    </div>
                </section>);
    }
});
