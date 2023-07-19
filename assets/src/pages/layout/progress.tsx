import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

export default class extends React.Component<Props, State> {
    state = {
        show: false,
        value: 0
    };

    render() {
        const {variant = 'indeterminate'} = this.props;

        if (!this.state.show) {
            return null;
        }

        return <LinearProgress variant={variant} value={this.state.value} style={{position: 'fixed', top: 0, zIndex: 5}}/>;
    }

    toggleProgress = (show: boolean) => {
        this.setState({
            show: show
        });
    };

    updateValue = (value: number) => {
        this.setState({
            value: value
        });
    }
}

interface State {
    show: boolean
    value: number
}

interface Props {
    variant?: 'determinate' | 'indeterminate',
}