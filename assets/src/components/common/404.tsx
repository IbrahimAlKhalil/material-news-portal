import * as React from "react";
import {FunctionComponent} from "react";

const FourZeroFour:FunctionComponent<Props> = ({title}) => {
    return (
        <h1 style={{textAlign: 'center'}}>
            Sorry! the {title} you're looking for is not found.
        </h1>
    );
};

interface Props {
    title: string
}

export default FourZeroFour;