import * as React from 'react';
import AppBar from "@material-ui/core/AppBar/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { SocialIcon } from "../../components/icons/react-social-icons";
const styles = (theme) => (createStyles({
    root: {
        width: '100%'
    },
    col: {
        width: '100%',
        padding: `0 ${theme.spacing.unit}px`,
        [theme.breakpoints.up('md')]: {
            width: '50%'
        }
    },
    copyright: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        padding: 5,
        backgroundColor: darken(theme.palette.secondary.main, 0.1)
    },
    tip: {
        fontSize: '.9rem',
        backgroundColor: '#fff',
        color: '#000',
        fontWeight: 'bold'
    },
    icons: {
        '& a': {
            margin: theme.spacing.unit
        }
    },
    rightCol: {
        margin: '20px 0',
        [theme.breakpoints.up('md')]: {
            margin: 'auto'
        }
    },
    menu: {
        color: '#fff',
        marginTop: 25,
        '& a': {
            padding: theme.spacing.unit
        }
    }
}));
let data = null;
export default withStyles(styles)(class extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            loaded: false
        };
    }
    render() {
        const { classes } = this.props;
        const color = '#fff';
        return (<React.Fragment>
                    <AppBar position="static" className={classes.root} color="secondary" component="footer" id="footer">
                        <div className="flex flex-wrap-md">
                            <div className={`${classes.col} flex justify-content-center`} id="footer-description" dangerouslySetInnerHTML={{ __html: data ? data.description : '' }}/>
                            <div className={`${classes.col} ${classes.rightCol}`}>
                                <div className={`flex flex-wrap justify-content-center ${classes.icons}`}>
                                    {data ? data.socialMedia.map((media, index) => <SocialIcon key={`i-${index}`} url={media.link} fgColor={color}/>) : ''}
                                </div>
                                <div className={`${classes.menu} flex flex-wrap justify-content-center`}>
                                    {data ? data.menu.map((item, index) => (<a className="link-primary" key={`f-${index}`} href={item.link}>{item.title}</a>)) : ''}
                                </div>
                            </div>
                        </div>
                        <div className={classes.copyright}>
                            <small>{data ? data.copyright : ''}</small>
                        </div>
                    </AppBar>
                </React.Fragment>);
    }
    async componentDidMount() {
        if (!data) {
            let response = await fetch(window.saharaRoutes.footer);
            data = await response.json();
            this.setState({
                loaded: true
            });
            return;
        }
        this.setState({
            loaded: true
        });
    }
});
