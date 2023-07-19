import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = () => createStyles({
    item: {
        overflow: 'visible'
    },
    popper: {
        left: 'calc(100% + 5px) !important'
    }
});
const PopperSubmenu = withStyles(styles)(class extends React.Component {
    constructor() {
        super(...arguments);
        this.anchorEl = null;
        this.state = {
            open: false
        };
        this.handleClose = (event) => {
            if (this.anchorEl && this.anchorEl.contains((event.target))) {
                return;
            }
            this.setState({ open: false });
        };
        this.handleToggle = () => {
            this.setState(state => ({ open: !state.open }));
        };
        this.handleOpen = () => {
            this.setState({ open: true });
        };
    }
    render() {
        let { open } = this.state;
        const { item } = this.props;
        const { id } = this.props;
        const { deep } = this.props;
        const { classes } = this.props;
        const Poppper = <Popper open={open} anchorEl={this.anchorEl} transition disablePortal placement="bottom" id={id ? id : undefined} className={deep ? classes.popper : undefined}>
                {({ TransitionProps, placement }) => (<Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                        <Paper>
                            <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList>
                                    {item.children.map((child, index) => {
            if (child.children) {
                return <PopperSubmenu key={`c-${index}`} item={child} deep/>;
            }
            return (<MenuItem key={`c-${index}`} component={({ innerRef, ...props }) => <Link to={item.link} {...props}/>}>
                                                    {item.title}
                                                </MenuItem>);
        })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>)}
            </Popper>;
        if (!deep) {
            return (<React.Fragment>
                        <Button buttonRef={node => {
                this.anchorEl = node;
            }} aria-owns={open && id ? id : undefined} aria-haspopup="true" onClick={this.handleToggle} color="inherit">
                            {item.title}
                        </Button>
                        {Poppper}
                    </React.Fragment>);
        }
        return (<MenuItem aria-haspopup="true" onClick={this.handleOpen} className={classes.item}>
                    <div ref={node => this.anchorEl = node}>
                        {item.title}
                    </div>
                    {Poppper}
                </MenuItem>);
    }
});
export default PopperSubmenu;
