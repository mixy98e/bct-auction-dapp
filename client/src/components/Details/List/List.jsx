import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button, Slide, FormControl, TextField } from '@material-ui/core';
import { Delete, Gavel, EmojiEvents } from '@material-ui/icons';
import { Chip, Divider, Typography, InputAdornment } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Icon } from '@iconify/react';
import { AuctionFactoryContext } from '../../../context/AuctionFactoryContext';
import Accordion from './Accordion/Accordion';
import useStyles from './styles';
import { useState } from 'react';
import unixToDate from '../../../utils/unixToDate';

const List = () => {
  const classes = useStyles();
  const { allAuctionsDetails, currentAccount, placeBid, handleBidPriceChange } = useContext(AuctionFactoryContext);
  const { bidPrice, setBidPrice} = useState(0);

  const submitBidPlacement = async (auctionAddress) => {
    placeBid(auctionAddress);
  } 

  return (
    <MUIList dense={false} className={classes.list}>
      {allAuctionsDetails.map((auction) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={auction.address}>
          <div  style={{/*borderBottom: '1px solid lightgray',*/ paddingTop: '15px', marginBottom: '10px'}}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <Gavel />
                </Avatar>
              </ListItemAvatar>
              <div style={{display: 'flex', flexDirection: "column"}}>
                <ListItemText secondary={`Auction: ${auction.address}`} />
                {/* <ListItemText secondary={`Owner: ${auction.beneficiary}`} /> */}
                <Chip className={ currentAccount === auction.highestBidder ? classes.chipStyleGreen : classes.chipStyleRed}
                      label={`Current value: ${auction.highestBid} ETH - Ending time: ${unixToDate(auction.auctionEndTime)}`} 
                      variant="outlined" />
                <div style={{height: '1px'}}></div>
                {/* <ListItemText secondary={`Highest bidder: ${auction.highestBidder}`} /> */}
              </div>
              <ListItemSecondaryAction>
                {/* <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(transaction.id)}>
                  <EmojiEvents />
                </IconButton> */}
                {/* <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(transaction.id)}>
                  <Delete />
                </IconButton> */}

                <div style={{display: 'flex', flexDirection: "column", height: '100%', paddingTop: ''}}>
                  <FormControl>
                    <TextField label="You're price (ETH)" type="number" fullWidth onChange={(e) => handleBidPriceChange(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="cib:ethereum" style={{color: 'purple'}} />
                        </InputAdornment>
                       )
                      }}/>
                  </FormControl>
                  <FormControl style={{paddingTop: "4px"}}>
                    <Button className={classes.button} variant="outlined" color="primary"  onClick={() => submitBidPlacement(auction.address)}>Place bid</Button>
                    
                  </FormControl>
                  <div style={{ paddingTop: '5px' }}>
                    <Rating name="simple-controlled" value={3} />
                  </div>

                </div>
              </ListItemSecondaryAction>
            </ListItem>
            <div style={{paddingTop: '20px'}}>
              <Accordion auctionDetails={auction}/>
            </div>
          </div>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;