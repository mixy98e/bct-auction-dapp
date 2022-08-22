import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  income: {
    borderBottom: '10px solid rgba(0, 255, 0, 0.5)',
    height: '100%',
    // width: '150%'
  },
  expense: {
    borderBottom: '10px solid rgba(255, 0, 0, 0.5)',
  },
}));
