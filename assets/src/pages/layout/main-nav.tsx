import * as React from "react";

import {NavLink} from "react-router-dom";
import MenuItemSubMenu from "./submenu";

import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";

import {FunctionComponent} from "react";

const styles = () => (createStyles({
    mainNav: {
        '& button, & > a': {
            // fontWeight: 'bold',
            textShadow: '0 0 1px rgba(0, 0, 0, .1)'
        }
    }
}));

export default withStyles(styles)(
    class MainNav extends React.Component<Props> {

        render() {
            const {classes} = this.props;
            const {props} = this;
            const {className} = this.props;

            const Wrapper: FunctionComponent<{ ulLi?: boolean }> = ({children, ulLi}) => {
                if (ulLi) {
                    return <List component="ul">{children}</List>;
                }

                return <React.Fragment>{children}</React.Fragment>;
            };


            const ListItemLink: FunctionComponent<{ to: string }> = (props) => {
                return (
                    <NavLink {...props}/>
                );
            };

            const MenuItem: FunctionComponent<{ item: NavMenu, id: string, ulLi?: boolean }> = ({item, id, ulLi}) => {

                if (item.children) {
                    return (
                        <MenuItemSubMenu item={item} id={id} ulLi={ulLi}/>
                    );
                }

                if (ulLi) {

                    return (
                        <li>
                            <ListItem button
                                      component={({innerRef, ...props}) => <ListItemLink to={item.link} {...props}/>}>
                                <ListItemText primary={item.title}/>
                            </ListItem>
                        </li>
                    );
                }

                return (
                    <Button color="inherit" component={props => <ListItemLink to={item.link} {...props}/>}>
                        {item.title}
                    </Button>
                );
            };

            return (
                <nav className={`${classes.mainNav} ${className !== undefined ? className : ''}`}>
                    <Wrapper ulLi={props.ulLi}>
                        {
                            window.saharaData.mainMenu.map((item: NavMenu, index: number) => {
                                const id = `${item.link}-${index}`;

                                return <MenuItem item={item} key={id} id={id} ulLi={props.ulLi}/>;
                            })
                        }
                    </Wrapper>
                </nav>
            );
        }
    }
);

interface Props extends WithStyles<typeof styles> {
    ulLi?: boolean
    className?: string
}

export interface NavMenu {
    title: string
    link: string
    children?: NavMenu[]
}