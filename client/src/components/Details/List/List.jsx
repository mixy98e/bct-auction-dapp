import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button, Slide, FormControl, TextField } from '@material-ui/core';
import { Delete, Gavel, EmojiEvents} from '@material-ui/icons';
import { Chip, Divider } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { AuctionFactoryContext } from '../../../context/AuctionFactoryContext';
import useStyles from './styles';

const List = () => {
  const classes = useStyles();
  const { fetchAllAuctions, allAuctions, allAuctionsDetails, fetchAuctionDetails, currentAccount, placeBid } = useContext(AuctionFactoryContext);

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
                <ListItemText secondary={`Owner: ${auction.beneficiary}`} />
                <ListItemText secondary={`Highest bidder: ${auction.highestBidder}`} />
                <Chip className={ currentAccount === auction.highestBidder ? classes.chipStyleGreen : classes.chipStyleRed}
                      label={`Current value: ${auction.highestBid._hex}  -  ending time: ${auction.auctionEndTime._hex}`} 
                      variant="outlined" />
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
                    <TextField label="You're price" />
                  </FormControl>
                  <FormControl style={{paddingTop: "4px"}}>
                    <Button className={classes.button} variant="outlined" color="primary"  onClick={() => submitBidPlacement(auction.address)}>Place bid</Button>
                  </FormControl>
                  {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}> */}
                    <Rating name="simple-controlled" value={3} />
                  {/* </div> */}
                </div>
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;