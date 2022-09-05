import { makeStyles } from '@material-ui/core/styles';
import { red, green, blue } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  avatar: {
    color: '#fff',
    backgroundColor: blue[500],

  },
  chipStyleRed: {
    borderRadius: '3px',
    color: red[500],
    borderColor: red[500],
    height: '36px'
  },
  chipStyleGreen: {
    borderRadius: '3px',
    color: green[500],
    borderColor: green[500],
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
  }
}));