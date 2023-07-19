import * as React from "react";

import PostBlock1 from "../components/blocks/post-block-1";
import PostBlock2 from "../components/blocks/post-block-2";
import BlockCategories from "../components/blocks/categories";
import Gallery, {GalleryItem} from "../components/blocks/gallery";
import Fallback from "./layout/fallback";

import HeadLines, {HeadlinesBlock} from "../components/blocks/hedlines";
import Slider, {Slide} from "../components/blocks/post-slider";
import {Post as PostBlock1Post} from "../components/common/card-1";
import {Post as PostBlock2Post} from "../components/common/card-2";
import {Category} from "../components/common/card-3";
import Fade from "@material-ui/core/Fade/Fade";

export default class extends React.Component<Props> {
    render() {
        const {data} = this.props;

        if (!data) {
            return <Fallback className="spacing-right spacing-left" height="100vh"
                             suspense={false}
                             progress={true}/>;
        }

        return (
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
        );
    }
}

interface Props {
    data?: {
        headlines: HeadlinesBlock
        slides: Slide[]
        postBlock1: PostBlock1Post[]
        postBlock2: PostBlock2Post[]
        categories: Category[]
        gallery: GalleryItem[]
    }
}

