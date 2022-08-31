import React, { useContext, useState } from 'react'
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button, Slide, FormControl, TextField } from '@material-ui/core';
import { Gavel } from '@material-ui/icons';
import { Chip, Typography, InputAdornment } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Icon } from '@iconify/react';
import Accordion from '../Accordion/Accordion';
import useStyles from './styles';
import { AuctionFactoryContext } from '../../../../context/AuctionFactoryContext';

const ListDetailItem = ({auction}) => {
  const classes = useStyles();
  const { currentAccount, placeBid, rateOwner } = useContext(AuctionFactoryContext);
  const [ bidPrice, setBidPrice ] = useState(0);
  const [ rateValue, setRateValue ] = useState(0);

  const submitBidPlacement = async (auctionAddress) => {
    console.log('submitBidPlacement',auctionAddress, bidPrice);
    if(bidPrice > 0){
      placeBid(auctionAddress, bidPrice);
      setBidPrice(0);
    }
  } 

  const submitRate = async (ownerAddress, auctionAddress) => {
    if(rateValue > 0 && rateValue <= 5){
      rateOwner(ownerAddress, auctionAddress, rateValue);
      setRateValue(0);
    }
  }


  return (
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
                  label={`Current value: ${auction.highestBid._hex}  -  ending time: ${auction.auctionEndTime._hex}`} 
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
                <TextField label="You're price (ETH)" type="number" fullWidth onChange={(e) => setBidPrice(e.target.value)}
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
              <div style={{ paddingTop: '5px', display: 'flex', justifyContent: 'start' }}>
              <Rating name={`simple-controlled-adr:${auction.address}`} value={rateValue} key={auction.address} onChange={(event, newValue) => { setRateValue(newValue) }} />
                <Typography variant="subtitle1" style={{ color: 'gray', paddingLeft: '8px', cursor: 'pointer'}} onClick={() => submitRate(auction.beneficiary, auction.address)}>Rate owner</Typography>
              </div>

            </div>
          </ListItemSecondaryAction>
        </ListItem>
        <div style={{paddingTop: '20px'}}>
          <Accordion auctionDetails={auction}/>
        </div>
      </div>
    </Slide>

  )
}

export default ListDetailItem