import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, Gavel, EmojiEvents, Reply} from '@material-ui/icons';
import { Chip } from '@material-ui/core'

import { ExpenseTrackerContext } from '../../../context/context';
import useStyles from './styles';

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);
  const isWon = 'won';
  const ownerAddress = '44c68123-5b86-4cc8-b915-bb9e16cebe6a';

  const withdrawAssets = () => {
    console.log('clicked on chip');
  }

  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map((transaction) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={ownerAddress === transaction.winner ? classes.avatarIncome : classes.avatarExpense}>
                <Gavel />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={transaction.name} secondary={`$${transaction.price} - ${transaction.endDate}`} />
            <ListItemSecondaryAction>
              <Chip label="Won" variant="outlined" className={ownerAddress === transaction.winner ? classes.chipWonVisible : classes.displayNoneClass}/>
              <Chip label="Lost" variant="outlined" className={ownerAddress !== transaction.winner ? classes.chipLossVisible : classes.displayNoneClass}/>

              <IconButton edge="end" aria-label="won" className={ownerAddress === transaction.winner ? classes.iconWon : classes.displayNoneClass} /*nClick={() => deleteTransaction(transaction.id)}*/>
                <EmojiEvents />
              </IconButton>
              <IconButton edge="end" aria-label="loss" onClick={withdrawAssets} className={ownerAddress !== transaction.winner ? classes.iconLoss : classes.displayNoneClass} /*onClick={() => deleteTransaction(transaction.id)}*/>
                <Reply />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;
