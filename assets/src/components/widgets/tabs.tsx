import * as React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SwipeableViews from 'react-swipeable-views';
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {PostCommon, Widget} from "../../typings";
import {Link} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const styles = () => createStyles({
    tab: {
        fontWeight: "bold"
    }
});

export default withStyles(styles)(
    class extends React.Component<Props> {

        state = {
            value: 0
        };

        handleChange = (event: React.ChangeEvent<{}>, value: number) => {
            this.setState({
                value: value
            });
        };

        handleChangeIndex = (index: number) => {
            this.setState({value: index});
        };

        render() {
            const {classes} = this.props;
            const tabs: string[] = ['নির্বাচিত', 'সর্বাধিক পঠিত', 'আলোচিত'];
            const {data} = this.props;

            return (
                <React.Fragment>
                    <AppBar position="static" color="default">
                        <Tabs value={this.state.value} textColor="primary" indicatorColor="primary" variant="fullWidth"
                              onChange={this.handleChange}>
                            {
                                tabs.map((tab, index) => (
                                    <Tab label={tab} className={classes.tab} key={tab + index}/>
                                ))
                            }
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis="x"
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}>
                        <List>
                            {
                                data && data.selected.map((post, index) => (
                                    <li key={`p-${index}`}>
                                        <ListItem button divider
                                                  component={({innerRef, ...props}) => <Link
                                                      to={`/${post.slug}`} {...props}/>}>
                                            <ListItemText primary={post.title}/>
                                        </ListItem>
                                    </li>
                                ))
                            }
                        </List>
                        <List>
                            {
                                data && data.mostViewed.map((post, index) => (
                                    <li key={`p-${index}`}>
                                        <ListItem button divider
                                                  component={({innerRef, ...props}) => <Link
                                                      to={`/${post.slug}`} {...props}/>}>
                                            <ListItemText primary={post.title}/>
                                        </ListItem>
                                    </li>
                                ))
                            }
                        </List>
                        <List>
                            {
                                data && data.mostCommented.map((post, index) => (
                                    <li key={`p-${index}`}>
                                        <ListItem button divider
                                                  component={({innerRef, ...props}) => <Link
                                                      to={`/${post.slug}`} {...props}/>}>
                                            <ListItemText primary={post.title}/>
                                        </ListItem>
                                    </li>
                                ))
                            }
                        </List>
                    </SwipeableViews>
                </React.Fragment>
            );
        }
    });

interface Props extends WithStyles<typeof styles>, Widget {
    data?: {
        mostViewed: PostCommon[],
        mostCommented: PostCommon[],
        selected: PostCommon[]
    }
}