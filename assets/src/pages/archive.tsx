import * as React from "react";
import PostBlock2 from "../components/blocks/post-block-2";
import {Post} from "../components/common/card-2";
import Fallback from "./layout/fallback";
import Fade from "@material-ui/core/Fade/Fade";

if (!IntersectionObserver) {
    import('../modules/intersection-observer');
}

function parseSlug() {
    const str = location.pathname.slice(1);
    return str.slice(str.indexOf('/') + 1);
}

export default class extends React.Component<Props, State> {
    div: HTMLDivElement | null = null;
    observer: IntersectionObserver | null = null;
    paged: number = 1;
    requests: XMLHttpRequest[] = [];
    endOfPage: boolean = false;

    state = {
        data: this.props.data
    };

    render() {
        const {data} = this.state.data ? this.state : this.props;

        if (!data) {
            return <Fallback className="spacing-right spacing-left" height="100vh"
                             suspense={false}
                             progress={true}/>;
        }

        return (
            <React.Fragment>
                <Fade in={true}>
                    <PostBlock2 posts={data}/>
                </Fade>
                <div ref={
                    div => {
                        this.div = div;
                        if (div) {
                            this.observer = new IntersectionObserver(this.infiniteScroll, {
                                root: null,
                                threshold: 1.0,
                                rootMargin: '0px'
                            });

                            this.observer.observe(div);
                        }
                    }}/>
            </React.Fragment>
        );
    }

    componentWillUnmount() {
        (this.observer && this.div) && this.observer.unobserve(this.div);
        this.requests.length && this.requests.forEach(request => request.abort());
    }


    infiniteScroll: IntersectionObserverCallback = (entries) => {
        if (this.endOfPage) {
            (this.observer as IntersectionObserver).unobserve(this.div as HTMLDivElement);
            return;
        }

        if (entries[0].isIntersecting) {
            const request = new XMLHttpRequest();
            this.requests.push(request);

            request.open('GET', `${window.saharaRoutes.category}/${parseSlug()}/${++this.paged}`);
            request.onload = () => {
                const data = JSON.parse(request.responseText);

                if (data.length) {
                    this.setState(state => {
                        const prevData = state.data ? state.data : this.props.data;

                        return {data: [...prevData, ...data]};
                    });
                } else {
                    this.endOfPage = true;
                }
            };

            request.send();
        }
    };
}

interface Props {
    data: Post[]
}

interface State {
    data: Post[]
}