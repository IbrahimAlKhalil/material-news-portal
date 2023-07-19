import * as React from "react";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Fallback from "./fallback";
import {FourZeroFour, Home, Post, Category, Archive} from "../../modules/pager";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: 'Kalpurush',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600
        },
        h2: {
            fontSize: '1.6rem',
        }
    },
    palette: {
        primary: {
            main: '#2196f3'
        },
        secondary: {
            main: '#434456'
        },
        background: {
            'default': '#e9eaea'
        }
    },
    spacing: {
        unit: 10
    }
});

const Header = React.lazy(() => import('./header'));
const Widgets = React.lazy(() => import('./widgets'));
const Footer = React.lazy(() => import('./footer'));
const BottomToTop = React.lazy(() => import('../../components/common/bottom-to-top'));

export default class extends React.Component {
    render() {
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <Fallback height="65px">
                        <Header/>
                    </Fallback>
                    <main className="flex flex-wrap-md align-items-start spacing-top-sm">
                        <section id="contents">
                            <Switch>
                                <Route path="/" exact render={props => <Home {...props}/>}/>
                                <Route path="/category/:slug" exact render={props => <Category {...props}/>}/>
                                <Route path="/:slug" exact render={props => <Post {...props}/>}/>
                                <Route path="/:year(\d{4})/:month(\d{1,2})/:date(\d{1,2})" exact
                                       render={props => <Archive {...props}/>}/>
                                <Route component={FourZeroFour}/>
                            </Switch>
                        </section>
                        <aside id="side-bar">
                            <Fallback height="100vh">
                                <Widgets/>
                            </Fallback>
                        </aside>
                    </main>
                    <React.Suspense fallback={null}>
                        <BottomToTop/>
                    </React.Suspense>
                    <React.Suspense fallback={null}>
                        <Footer/>
                    </React.Suspense>
                </MuiThemeProvider>
            </Router>
        );
    }
}