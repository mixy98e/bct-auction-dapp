import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button, Slide, FormControl, TextField } from '@material-ui/core';
import { Delete, Gavel, EmojiEvents } from '@material-ui/icons';
import { Chip, Divider, Typography, InputAdornment } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Icon } from '@iconify/react';
import { AuctionFactoryContext } from '../../../context/AuctionFactoryContext';
import ListDetailItem from './ListItem/ListDetailItem';
import useStyles from './styles';
import { useState } from 'react';
import unixToDate from '../../../utils/unixToDate';

const List = () => {
  const classes = useStyles();
  const { allAuctionsDetails, searchedAuctionsDetails, currentAccount, placeBid, handleBidPriceChange } = useContext(AuctionFactoryContext);
  const { bidPrice, setBidPrice } = useState(0);
  const { ratesMap, setRatesMap } = useState(new Map());

  const submitBidPlacement = async (auctionAddress) => {
    placeBid(auctionAddress);
  } 

  return (
    <MUIList dense={false} className={classes.list}>
      {searchedAuctionsDetails.map((auction) => (
        <div>
            <ListDetailItem auction={auction} key={auction.address} />
        </div>
      ))}
    </MUIList>
  );
};

export default List;