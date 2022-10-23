import React, { useContext } from 'react';
import { List as MUIList } from '@material-ui/core';
import { AuctionFactoryContext } from '../../../context/AuctionFactoryContext';
import ListDetailItem from './ListItem/ListDetailItem';
import useStyles from './styles';

const List = () => {
  const classes = useStyles();
  const { searchedAuctionsDetails } = useContext(AuctionFactoryContext);


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