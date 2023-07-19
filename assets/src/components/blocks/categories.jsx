import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Card from "../common/card-3";
const styles = (theme) => createStyles({
    container: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridGap: `${theme.spacing.unit + 10}px`
    }
});
export default withStyles(styles)(class extends React.Component {
    render() {
        const { classes } = this.props;
        const { categories } = this.props;
        return (<section className={`content-block grid ${classes.container} spacing`}>
                    {categories.map((category, index) => <Card key={`c-${index}`} category={category}/>)}
                </section>);
    }
});
