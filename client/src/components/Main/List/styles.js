import { makeStyles } from '@material-ui/core/styles';
import { red, green, blue } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  avatarGreen: {
    color: '#fff',
    backgroundColor: green[500],
  },
  avatarBlue: {
    color: '#fff',
    backgroundColor: '#3f50b5',
  },
  avatarPurple: {
    color: '#fff',
    backgroundColor: 'purple',
  },
  avatarRed: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  list: {
    maxHeight: '82%',
    overflow: 'auto',
  },
  chipWonVisible: {
    color: "#D9AE5F",
    borderColor: "#A6882E",
    cursor: "pointer",
    minWidth: '130px'
  },
  chipLossVisible: {
    color: "#BF0041",
    borderColor: "#7F002B",
    cursor: "pointer"
  },
  displayNoneClass: {
    display: "none",
  },
  iconWon: {
    color: "#D9AE5F",
  },
  iconLoss: {
    color: "#BF0041",
  }
}));
