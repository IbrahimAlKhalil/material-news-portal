import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {FunctionComponent} from "react";

const Fallback: FunctionComponent<Props> = function ({height, className, children, render, progress = true, suspense = true}) {

    if (render) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    const ProgressDiv = (
        <div className={`fallback ${className}`}
             style={{height: height}}>
            {progress && <LinearProgress color="primary"/>}
        </div>
    );

    if (suspense) {
        return (
            <React.Suspense fallback={ProgressDiv}>
                {children}
            </React.Suspense>
        );
    }

    return ProgressDiv;
};


const Progress: FunctionComponent<ProgressProps> = ({render, children, className, height}) => {
    console.log(render);

    if (render) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return (
        <div className={`fallback ${className}`}
             style={{height: height}}>
            <LinearProgress color="primary"/>
        </div>
    );
};

interface ProgressProps {
    render: boolean
    className?: string
    height: string
}


interface Props {
    className?: string
    height: string
    progress?: boolean
    suspense?: boolean,
    render?: boolean
}


export {Progress};
export default Fallback;
