import * as React from "react";

import {ComponentType, FunctionComponent} from "react";
import Fallback from "../pages/layout/fallback";
import {RouteComponentProps} from "react-router";


/*
 * These modules exist because I didn't want to force the Users to download all the components which aren't really needed.
 */

const cache: Cache = {};

const fetchData: FetchData = function (route, cacheId) {
    const request = new XMLHttpRequest();

    return {
        request: request,
        data() {
            return new Promise((resolve, reject) => {
                const ready = () => {
                    request.onload = () => {
                        const data = JSON.parse(request.responseText);
                        if (cacheId) {
                            cache[cacheId] = data;
                        }
                        resolve(data);
                    };
                    request.onerror = () => reject('Sorry something happened! data couldn\'t be loaded.');
                    request.onabort = () => resolve(false);
                    request.open('GET', route);
                    request.send();
                };

                if (cacheId) {
                    if (!cache[cacheId]) {
                        ready();
                    } else {
                        resolve(cache[cacheId]);
                    }
                } else {
                    ready();
                }
            });
        }
    };
};

interface FetchData {
    (route: string, cacheId?: string): Data
}

interface Data {
    request: XMLHttpRequest

    data(): Promise<object | boolean>
}

class Pager extends React.Component<Props, State> {
    request: XMLHttpRequest | undefined;

    state = {
        data: null
    };

    render() {
        const Component = this.props.component;

        return <Component data={this.state.data}/>;
    }

    async componentDidMount() {
        const {props} = this;
        const {route} = this.props;

        const fetcher = fetchData(route, props.cache);
        this.request = fetcher.request;
        const data = await fetcher.data();

        window.scrollTo(0, 0);
        setTimeout(() => this.setState({
            data: data
        }));
    }

    componentWillUnmount() {
        this.request && this.request.abort();
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.route === this.props.route) {
            return;
        }

        const fetcher = fetchData(nextProps.route, nextProps.cache);

        this.request = fetcher.request;

        fetcher.data().then(data => {
            this.setState({
                data: data
            });
        });
    }
}

interface Props {
    route: string
    cache?: string
    component: ComponentType<{ data?: any }>
}

interface State {
    data: any
}

interface Cache {
    [index: string]: object
}


interface PagerComponentProps<T> extends RouteComponentProps<T> {
}

/*
interface MatchParams {
    slug: string;
}
*/

/************************** Home ***********************************/

const Home: FunctionComponent<PagerComponentProps<any>> = () => {
    let Component = React.lazy(() => import('../pages/home'));

    return <Pager cache="home" route={window.saharaRoutes.homeContents} component={({data}) =>
        <Fallback height="100vh" className="spacing-right spacing-left">
            <Component data={data}/>
        </Fallback>
    }/>
};

/******************************* Single Post **********************/



const Post: FunctionComponent<PagerComponentProps<{ slug: string }>> = (props) => {

    const {slug} = props.match.params;

    return <Pager route={`${window.saharaRoutes.posts}/${slug}`} component={({data}) => {

        if (data && (data.status && data.status === 404)) {
            const FourZeroFour = React.lazy(() => import('../components/common/404'));

            return (
                <Fallback height="100vh" className="spacing-right spacing-left">
                    <FourZeroFour title="Page Or Article"/>
                </Fallback>
            );
        }

        let Component = data && data.type === 'page' ?
            React.lazy(() => import('../pages/page')) :
            React.lazy(() => import('../pages/post'));


        return (
            <Fallback height="100vh" className="spacing-right spacing-left">
                <Component data={data}/>
            </Fallback>
        );
    }
    }/>;
};

/******************************* Category Post **********************/



const Category: FunctionComponent<PagerComponentProps<{ slug: string }>> = (props) => {
    let Component = React.lazy(() => import('../pages/archive'));
    const {slug} = props.match.params;

    return <Pager route={`${window.saharaRoutes.category}/${slug}/1`} component={({data}) =>
        <Fallback height="100vh" className="spacing-right spacing-left">
            <Component data={data}/>
        </Fallback>
    }/>;
};


/******************************* Date Archive **********************/



const Archive: FunctionComponent<PagerComponentProps<{ year: number, month: number, date: number }>> = (props) => {
    let Component = React.lazy(() => import('../pages/archive'));
    const {params} = props.match;
    const date = `${params.year}/${params.month}/${params.date}`;

    return <Pager route={`${window.saharaRoutes.archive}/${date}/1`} component={({data}) =>
        <Fallback height="100vh" className="spacing-right spacing-left">
            <Component data={data}/>
        </Fallback>
    }/>;
};


/*****************************  404 page **************************************/

const FourZeroFour: FunctionComponent<PagerComponentProps<any>> = (props) => {
    let Component = React.lazy(() => import('../pages/404'));

    return (
        <Fallback height="100vh" className="spacing-right spacing-left">
            <Component/>
        </Fallback>
    );
};


function parseSearchQuery() {
    const search = location.search;
    if (!search) {
        return false;
    }

    const params = {} as {
        [index: string]: string
    };

    const keyValues = search.slice(1, search.length).split('&');
    keyValues.forEach(keyValue => {
        const a = keyValue.split('=');
        params[a[0]] = a[1];
    });

    if(!params.hasOwnProperty('s')) {
        return false;
    }

    return params['s'];
}

export {Post, Home, Category, Archive, FourZeroFour};