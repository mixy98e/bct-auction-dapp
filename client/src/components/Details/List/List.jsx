import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button, Slide, FormControl, TextField } from '@material-ui/core';
import { Delete, Gavel, EmojiEvents} from '@material-ui/icons';

import { ExpenseTrackerContext } from '../../../context/context';
import useStyles from './styles';

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

  return (
    <MUIList dense={true} className={classes.list}>
      {transactions.map((transaction) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                <Gavel />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`} />
            <ListItemSecondaryAction>
              {/* <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(transaction.id)}>
                <EmojiEvents />
              </IconButton> */}
              {/* <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(transaction.id)}>
                <Delete />
              </IconButton> */}
              <FormControl>
                <TextField label="Price" />
              </FormControl>
              <FormControl>
                <Button className={classes.button} variant="outlined" color="primary">Bid</Button>
              </FormControl>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;