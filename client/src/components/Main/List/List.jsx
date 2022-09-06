import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, Gavel, EmojiEvents, Reply } from '@material-ui/icons';
import { Chip } from '@material-ui/core'

import { ExpenseTrackerContext } from '../../../context/context';
import useStyles from './styles';
import { AuctionFactoryContext } from '../../../context/AuctionFactoryContext';
import compareDate from '../../../utils/compareDate';

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);
  const isWon = 'won';
  const { allAuctionsDetails, currentAccount, endAuction } = useContext(AuctionFactoryContext);

  const handleEndAuction = (auctionAddress) => {
    endAuction(auctionAddress)
  }


  return (
    <MUIList dense={false} className={classes.list}>
      {allAuctionsDetails.map((auction) => (
        currentAccount.toLowerCase() === auction.beneficiary.toLowerCase() && 
        !compareDate(auction.auctionEndTime) &&
        auction.highestBid > 0 &&
        (<Slide direction="down" in mountOnEnter unmountOnExit key={auction.address}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.avatarBlue}>
                <Gavel />
              </Avatar>
            </ListItemAvatar>
            <div style={{width: '60%'}}>
              <ListItemText secondary={auction.address} style={{wordBreak: 'break-word', color: 'gray'}} /*secondary={`$${transaction.price} - ${transaction.endDate}`}*/ />
            </div>
            <ListItemSecondaryAction>
              <Chip label={auction.highestBid ? `Collect: ${auction.highestBid} ETH` : '0 ETH'} variant="outlined" className={classes.chipWonVisible} data-auction-address={auction.address} onClick={() => handleEndAuction(auction.address)}/>
              {/* <Chip label="Lost" variant="outlined" className={ownerAddress !== transaction.winner ? classes.chipLossVisible : classes.displayNoneClass}/>} */}
              {/* <ListItemText secondary={auction.highestBid? auction.highestBid._hex: '---' } style={{wordBreak: 'break-word', color: 'gray'}} /*secondary={`$${transaction.price} - ${transaction.endDate}`}*/}

              
              {/* {<IconButton edge="end" aria-label="loss" onClick={withdrawAssets} className={ownerAddress !== transaction.winner ? classes.iconLoss : classes.displayNoneClass} onClick={() => deleteTransaction(transaction.id)}>
                <Reply />
              </IconButton>} */}
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>)
      ))}
    </MUIList>
  );
};

export default List;
