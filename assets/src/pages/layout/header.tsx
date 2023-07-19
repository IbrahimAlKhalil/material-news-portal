import * as React from 'react';

import {Link} from "react-router-dom";
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

import {fade} from "@material-ui/core/styles/colorManipulator";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";

import {Theme} from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";
import Popover from "@material-ui/core/Popover/Popover";
import Search from './../../modules/search';
import ListItem from "@material-ui/core/ListItem/ListItem";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import Popper from "@material-ui/core/Popper/Popper";
import Fade from "@material-ui/core/Fade/Fade";

const styles = (theme: Theme) => (createStyles({
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
        },
    },
    logo: {
        width: '100%'
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
    suggestions: {
        maxWidth: 400
    },
    popover: {
        marginTop: theme.spacing.unit,
        zIndex: 1111
    },
    noResult: {
        padding: theme.spacing.unit * 2
    }
}));

const finder = new Search<Suggestion[]>(window.saharaRoutes.search);

export default withStyles(styles)(
    class extends React.Component<Props, State> {
        anchorEl: HTMLDivElement | null = null;
        timeOutId: number = 0;

        state = {
            searchOpen: false,
            menuOpen: false,
            input: '',
            suggestionOpen: false,
            suggestions: []
        };

        render() {
            const {classes} = this.props;
            const {suggestions} = this.state;

            return (
                <React.Fragment>
                    <div>
                        <Link to="/">
                            <img className={classes.logo} src={window.saharaData.logo} alt="Description"/>
                        </Link>
                    </div>

                    <Paper>
                        {window.saharaData.dates}
                    </Paper>

                    <AppBar position="sticky" className={classes.root}>
                        <Drawer open={this.state.menuOpen} anchor="left" classes={{paper: classes.drawer}}
                                onClose={this.toggleMenu}>
                            <MainNav ulLi/>
                        </Drawer>
                        <Toolbar className={classes.toolbar}>
                            {
                                !this.state.searchOpen &&
                                <IconButton color="inherit" className={classes.searchBtn} onClick={this.toggleMenu}>
                                    <MenuIcon color="inherit"/>
                                </IconButton>
                            }
                            {/*{*/}
                            {/*!this.state.searchOpen &&*/}
                            {/*<Link to="/">*/}
                            {/*<img className={classes.logo} src={window.saharaData.logo} alt="Description"/>*/}
                            {/*</Link>*/}
                            {/*}*/}
                            <div className={classes.grow}/>

                            <MainNav className={classes.menu}/>

                            <ClickAwayListener onClickAway={this.hideSearch}>
                                <div className={`${classes.search} ${this.state.searchOpen ? classes.open : ''}`}
                                     ref={div => this.anchorEl = div}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon/>
                                    </div>
                                    <InputBase
                                        placeholder="আপনি কি খুজছেন?"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        type="search"
                                        value={this.state.input}
                                        onChange={this.handleInputChange}
                                    />
                                    {
                                        this.state.searchOpen &&
                                        <Button color="inherit">
                                            <Arrow color="inherit"/>
                                        </Button>
                                    }
                                </div>
                            </ClickAwayListener>


                            <Popper className={classes.popover} open={this.state.suggestionOpen}
                                    anchorEl={this.anchorEl} transition>
                                {({TransitionProps}) => (
                                    <ClickAwayListener onClickAway={this.handleSuggestionClose}>
                                        <Fade in={true} {...TransitionProps}>
                                            <Paper className={classes.suggestions} onClick={this.handleSuggestionClose}>
                                                {
                                                    suggestions.length ? <List className={classes.list}>
                                                        {
                                                            (suggestions as Suggestion[]).map((suggestion, index) => (
                                                                <ListItem key={`l-${index}`} divider button
                                                                          component={({innerRef, ...props}) =>
                                                                              <Link {...props}
                                                                                    to={`/${suggestion.slug}`}/>}>
                                                                    <img className={classes.listImg}
                                                                         src={suggestion.image}
                                                                         alt={suggestion.title}/>
                                                                    <Typography
                                                                        className={classes.listText}>{suggestion.title}</Typography>
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </List> : <div className={classes.noResult}>No Result!</div>
                                                }
                                            </Paper>
                                        </Fade>
                                    </ClickAwayListener>
                                )}
                            </Popper>
                            {
                                !this.state.searchOpen &&
                                <IconButton color="inherit" className={classes.searchBtn}
                                            onClick={this.openSearch}>
                                    <SearchIcon color="inherit"/>
                                </IconButton>
                            }
                        </Toolbar>
                    </AppBar>
                </React.Fragment>
            );
        }

        openSearch = () => {
            this.setState({
                searchOpen: true
            });
        };

        hideSearch = () => {
            if (this.state.searchOpen) {
                this.setState({
                    searchOpen: false
                });
            }
        };

        toggleMenu = () => {
            this.setState({
                menuOpen: !this.state.menuOpen
            });
        };

        handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
            clearTimeout(this.timeOutId);
            const value = event.currentTarget.value;

            this.setState({
                input: value
            });

            if (!value) {
                return this.setState({
                    suggestionOpen: false
                });
            }

            this.timeOutId = window.setTimeout(async () => {
                try {
                    this.setState({
                        suggestionOpen: true,
                        suggestions: await finder.doSearch(value),
                    });
                } catch (e) {
                    console.log('e');
                }
            }, 600);
        };

        handleSuggestionClose = () => {

            console.log('handle');
            this.setState({
                suggestionOpen: false,
                input: ''
            });
        };

    }
);

interface Props extends WithStyles<typeof styles> {
}

interface State {
    searchOpen: boolean
    menuOpen: boolean
    input: string,
    suggestionOpen: boolean,
    suggestions: Suggestion[]
}

interface Suggestion {
    slug: string
    title: string
    image: string
}