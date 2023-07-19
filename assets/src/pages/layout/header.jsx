import * as React from 'react';
import { Link } from "react-router-dom";
import MainNav from "./main-nav";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Arrow from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button/Button";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/MenuRounded";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import InputBase from "@material-ui/core/InputBase/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
const styles = (theme) => (createStyles({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        display: 'none',
        width: '100%',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            width: 'auto',
            marginRight: theme.spacing.unit * 2,
            marginLeft: theme.spacing.unit,
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 4.5,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 4.5,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 180,
            '&:focus': {
                width: 250,
            },
        },
    },
    logo: {
        maxHeight: 50
    },
    searchBtn: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    open: {
        display: 'flex',
    },
    menu: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        },
    },
    drawer: {
        minWidth: '70%'
    },
    toolbar: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit
    }
}));
export default withStyles(styles)(class extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            searchOpen: false,
            menuOpen: false
        };
        this.openSearch = () => {
            this.setState({
                searchOpen: true
            });
        };
        this.hideSearch = () => {
            if (this.state.searchOpen) {
                this.setState({
                    searchOpen: false
                });
            }
        };
        this.toggleMenu = () => {
            this.setState({
                menuOpen: !this.state.menuOpen
            });
        };
    }
    render() {
        const { classes } = this.props;
        return (<React.Fragment>
                    <AppBar position="sticky" className={classes.root}>
                        <Drawer open={this.state.menuOpen} anchor="left" classes={{ paper: classes.drawer }} onClose={this.toggleMenu}>
                            <MainNav ulLi/>
                        </Drawer>
                        <Toolbar className={classes.toolbar}>
                            {!this.state.searchOpen &&
            <IconButton color="inherit" className={classes.searchBtn} onClick={this.toggleMenu}>
                                    <MenuIcon color="inherit"/>
                                </IconButton>}
                            {!this.state.searchOpen &&
            <Link to="/">
                                    <img className={classes.logo} src={window.saharaData.logo} alt="Description"/>
                                </Link>}
                            <div className={classes.grow}/>
                            <ClickAwayListener onClickAway={this.hideSearch}>
                                <div className={`${classes.search} ${this.state.searchOpen ? classes.open : ''}`}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase placeholder="আপনি কি খুজছেন?" classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
        }} type="search"/>
                                    {this.state.searchOpen &&
            <Button color="inherit">
                                            <Arrow color="inherit"/>
                                        </Button>}
                                </div>
                            </ClickAwayListener>
                            <MainNav className={classes.menu}/>

                            {!this.state.searchOpen &&
            <IconButton color="inherit" className={classes.searchBtn} onClick={this.openSearch}>
                                    <SearchIcon color="inherit"/>
                                </IconButton>}
                        </Toolbar>
                    </AppBar>
                </React.Fragment>);
    }
});
