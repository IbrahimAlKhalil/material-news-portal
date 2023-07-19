import * as React from "react";
import PostBlock2 from "../components/blocks/post-block-2";
import Fallback from "./layout/fallback";
import Fade from "@material-ui/core/Fade/Fade";
if (!IntersectionObserver) {
    import('../modules/intersection-observer');
}
function parseSlug() {
    const str = location.pathname.slice(1);
    return str.slice(str.indexOf('/') + 1);
}
export default class extends React.Component {
    constructor() {
        super(...arguments);
        this.div = null;
        this.observer = null;
        this.paged = 1;
        this.requests = [];
        this.endOfPage = false;
        this.state = {
            data: this.props.data
        };
        this.infiniteScroll = (entries) => {
            if (this.endOfPage) {
                this.observer.unobserve(this.div);
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
                            return { data: [...prevData, ...data] };
                        });
                    }
                    else {
                        this.endOfPage = true;
                    }
                };
                request.send();
            }
        };
    }
    render() {
        const { data } = this.state.data ? this.state : this.props;
        return (<Fallback className="spacing-right spacing-left" height="100vh" suspense={false} render={!!data}>
                <Fade in={true}>
                    <PostBlock2 posts={data}/>
                </Fade>
                <div ref={div => {
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
            </Fallback>);
    }
    componentWillUnmount() {
        (this.observer && this.div) && this.observer.unobserve(this.div);
        this.requests.length && this.requests.forEach(request => request.abort());
    }
}
