import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
const Fallback = function ({ height, className, children, render, progress = true, suspense = true }) {
    if (render) {
        return <React.Fragment>{children}</React.Fragment>;
    }
    const Progress = (<div className={`fallback ${className}`} style={{ height: height }}>
            {progress && <LinearProgress color="primary"/>}
        </div>);
    if (suspense) {
        return (<React.Suspense fallback={Progress}>
                {children}
            </React.Suspense>);
    }
    return Progress;
};
export default Fallback;
