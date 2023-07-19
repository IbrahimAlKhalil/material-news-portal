import * as React from "react";
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar/AppBar";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Button from "@material-ui/core/Button/Button";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import { Link } from "react-router-dom";
const styles = (theme) => createStyles({
    appBar: {
        padding: theme.spacing.unit,
    },
    category: {
        fontSize: '1.3rem',
        color: 'inherit',
        textAlign: 'center'
    },
    title: {
        fontSize: '1.3rem',
        margin: `${theme.spacing.unit}px 0`
    },
    list: {
        paddingBottom: 0
    },
    listImg: {
        width: 70,
        marginRight: 5,
        borderRadius: theme.shape.borderRadius
    },
    listText: {
        // fontSize: '1rem',
        color: theme.palette.primary.main
    },
    moreBtn: {
        width: '100%',
        margin: 'auto auto 0 auto'
    }
});
export default withStyles(styles)(class extends React.Component {
    render() {
        const { classes } = this.props;
        const { category } = this.props;
        const { posts } = category;
        if (!posts.length) {
            return null;
        }
        return (<Card className="flex flex-wrap">
                    <div>
                        <AppBar className={classes.appBar} color="primary" position="static" component="div">
                            <Typography className={classes.category}>{category.name}</Typography>
                        </AppBar>
                        <CardActionArea component={({ innerRef, ...props }) => <Link {...props} to={`/${posts[0].slug}`}/>}>
                            <CardMedia image={posts[0].images.medium} component="img"/>
                            <CardContent>
                                <Typography color="primary" className={`${classes.title}`}>
                                    {posts[0].title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <List className={classes.list}>
                            {posts.slice(1).map((post, index) => (<ListItem key={`l-${index}`} divider button component={({ innerRef, ...props }) => <Link {...props} to={`/${post.slug}`}/>}>
                                        <img className={classes.listImg} src={post.images.small} alt={post.title}/>
                                        <Typography className={classes.listText}>{post.title}</Typography>
                                    </ListItem>))}
                        </List>
                    </div>

                    <Button color="primary" className={classes.moreBtn} component={({ innerRef, ...props }) => (<Link {...props} to={`/category/${category.slug}`}/>)}>আরও</Button>
                </Card>);
    }
});
