import * as React from "react";
import PostBlock1 from "../components/blocks/post-block-1";
import PostBlock2 from "../components/blocks/post-block-2";
import BlockCategories from "../components/blocks/categories";
import Gallery from "../components/blocks/gallery";
import Fallback from "./layout/fallback";
import HeadLines from "../components/blocks/hedlines";
import Slider from "../components/blocks/post-slider";
import Fade from "@material-ui/core/Fade/Fade";
export default class extends React.Component {
    render() {
        const { data } = this.props;
        return (data &&
            <Fallback className="spacing-right spacing-left" height="100vh" suspense={false} render={!!data} progress={true}>
                <Fade in={true}>
                    <section>
                        <HeadLines data={data.headlines}/>
                        <Slider slides={data.slides}/>
                        <PostBlock1 posts={data.postBlock1}/>
                        <PostBlock2 posts={data.postBlock2}/>
                        <BlockCategories categories={data.categories}/>
                        <Gallery galleryItems={data.gallery}/>
                    </section>
                </Fade>
            </Fallback>);
    }
}
