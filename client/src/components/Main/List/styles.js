import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import { Visibility } from '@material-ui/icons';

export default makeStyles((theme) => ({
  avatarIncome: {
    color: '#fff',
    backgroundColor: green[500],
  },
  avatarExpense: {
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
    cursor: "pointer"
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
