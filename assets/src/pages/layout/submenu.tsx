import * as React from "react";

import PopperSubmenu from "./popper-submenu";
import {Link} from "react-router-dom";

import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse/Collapse";
import List from "@material-ui/core/List/List";

import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";

import {NavMenu} from "./main-nav";
import {Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";

const styles = (theme: Theme) => createStyles({
    collapse: {
        marginLeft: theme.spacing.unit * 2
    }
});


const SubMenu = withStyles(styles)(
    class extends React.Component<Props, State> {

        state = {
            open: false,
            clicked: false
        };

        render() {
            const {props} = this;
            const {state} = this;
            const {classes} = props;
            const {id} = props;
            const {item} = props;

            if (!props.ulLi) {
                return <PopperSubmenu id={id} item={item}/>
            }

            return (
                <React.Fragment>
                    <li onClick={this.toggle} key={id}>
                        <ListItem button component="button">
                            <ListItemText primary={item.title}/>
                            {state.open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                    </li>

                    <Collapse className={classes.collapse} in={state.open} key={`coll-${id}`} component="li"
                              timeout="auto" unmountOnExit>
                        <List>
                            {
                                (item.children as NavMenu[]).map((child, index) => (
                                    child.children ?
                                        <SubMenu item={child} ulLi={props.ulLi} key={`c-${index}`}/> :

                                        <li key={`mn-${index}`}>
                                            <ListItem button
                                                      key={`${child.link}-${index}`}
                                                      component={({innerRef, ...props}) => <Link
                                                          to={child.link} {...props}/>}>
                                                <ListItemText primary={child.title}/>
                                            </ListItem>
                                        </li>
                                ))
                            }
                        </List>
                    </Collapse>
                </React.Fragment>
            );
        }

        toggle = () => {
            this.setState(state => ({
                open: !state.open
            }));
        };
    }
);

export default SubMenu;

interface Props extends WithStyles<typeof styles> {
    ulLi?: boolean,
    id?: string
    item: NavMenu
}

interface State {
    open: boolean
    clicked: boolean
}