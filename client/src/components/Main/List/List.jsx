import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Slide } from '@material-ui/core';
import { Gavel } from '@material-ui/icons';
import { Chip } from '@material-ui/core'

import useStyles from './styles';
import { AuctionFactoryContext } from '../../../context/AuctionFactoryContext';
import compareDate from '../../../utils/compareDate';

const List = () => {
  const classes = useStyles();
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
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>)
      ))}
    </MUIList>
  );
};

export default List;
