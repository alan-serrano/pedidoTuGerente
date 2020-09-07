export default (theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    appBar: {
        position: 'relative',
    },
    dialogFooter: {
        position: 'fixed',
        top: 'initial',
        right: 'initial',
        bottom: '0',
        left: '0'
    },
    dialogFooterContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    formControlCantidad: {
        margin: theme.spacing(1),
        minWidth: '60px',
    },
    paso: {
        paddingBottom: '80px'
    }
});