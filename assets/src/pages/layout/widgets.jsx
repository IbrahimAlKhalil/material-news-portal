import * as React from "react";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import WidgetTabs from "../../components/widgets/tabs";
import WidgetVideos from "../../components/widgets/videos";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
const styles = (theme) => createStyles({
    root: {
        height: 'auto',
        overflow: 'hidden',
        marginBottom: theme.spacing.unit + 10
    },
    wpWidget: {
        padding: theme.spacing.unit
    },
    title: {
        fontSize: '1.5rem',
        padding: theme.spacing.unit - 3,
        textAlign: 'center'
    }
});
const widgetList = {
    tabs: WidgetTabs,
    videos: WidgetVideos,
};
function parseWidget(widget) {
    const fragment = document.createElement('div');
    fragment.innerHTML = widget;
    const titleElm = fragment.querySelector('[data-widget-title]');
    let title = null;
    if (titleElm) {
        title = titleElm.innerHTML;
        titleElm.parentElement && titleElm.parentElement.removeChild(titleElm);
    }
    return {
        title: title,
        html: fragment.innerHTML
    };
}
export default withStyles(styles)(class extends React.Component {
    render() {
        const { classes } = this.props;
        return window.saharaData.widgets.map((widget, index) => {
            if (typeof widget === 'string') {
                const widgetParsed = parseWidget(widget);
                return (<Paper key={`wid-${index}`} className={`${classes.root} widget`}>
                            {widgetParsed.title && (<AppBar component="div" position="static" color="default">
                                        <Typography className={classes.title} color="inherit" component="p">{widgetParsed.title}</Typography>
                                    </AppBar>)}
                            <div dangerouslySetInnerHTML={{ __html: widgetParsed.html }} className={`${classes.wpWidget}`}/>
                        </Paper>);
            }
            const Widget = widgetList[widget.name];
            return (<Paper key={`wid-${index}`} className={`${classes.root} widget`}>
                        <Widget data={widget.data}/>
                    </Paper>);
        });
    }
});
