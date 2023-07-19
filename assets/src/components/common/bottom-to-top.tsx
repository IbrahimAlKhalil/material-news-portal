import * as React from "react";
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";
import Fab from "@material-ui/core/Fab/Fab";
import {CSSProperties} from "react";

export default class extends React.Component {
    gotToTop() {
        document.documentElement.scrollTop = 0;
    }

    render() {
        const style: CSSProperties = {
            position: 'fixed',
            bottom: '20px',
            right: '20px'
        };
        return (
            <Fab style={style} color="secondary" onClick={this.gotToTop} size="medium">
                <ArrowUp/>
            </Fab>
        );
    }
}