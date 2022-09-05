import { makeStyles } from '@material-ui/core/styles';
import { red, green, blue } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    avatarGreen: {
        color: '#fff',
        backgroundColor: '#4caf50',
    },
    avaterRed: {
        color: '#fff',
        backgroundColor: '#f50057',
    },
    chipStyleRed: {
        borderRadius: '3px',
        color: '#f50057',
        borderColor: 'rgba(245, 0, 87, 0.5)',
        height: '36px'
    },
    chipStyleGreen: {
        borderRadius: '3px',
        color: green[500],
        borderColor: '#4caf50',
        height: '36px'
    },
    avatarExpense: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: blue[500],
    },
    list: {
        maxHeight: '650px',
        overflow: 'auto',
    },
    divider: {
        margin: '20px 0',
    },
    elFlexResize: {
        flexGrow: '1'
    },
    button: {
        width: '100%'
    },
    buttonWithdraw: {
        width: '100%',
        paddingTop: '4px'
    }
}));