import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Button, Grid, FormControl, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { InputAdornment } from '@material-ui/core';
import { Search, TimeToLeaveSharp } from '@material-ui/icons';

import useStyles from './styles';
import { AuctionFactoryContext } from '../../context/AuctionFactoryContext';

const NavbarCard = ({ title, subheader }) => {
  const { filterSearch, filterSearchByAddress } = useContext(AuctionFactoryContext);
  const [view, setView] = React.useState('allAuctions');
  const classes = useStyles();
  
  const handleViewChange = (event, newView) => {
    setView(newView);
    filterSearch(newView);
    if(newView === null){
      setView('allAuctions');
    }
  };

  const handleSearchByAddress = (event) => {
    if(event.target.value === '') {
      filterSearchByAddress(event.target.value);
      setView('allAuctions');
    } else {
      filterSearchByAddress(event.target.value)
      setView('');
    }
  }

  const control = {
    value: view,
    onChange: handleViewChange,
    exclusive: true,
  };

  
  


  return (
    <Card className={classes.active}>
      {/* <CardHeader title={title} subheader={subheader} /> */}
      <CardContent container style={{flexWrap: "wrap", display:'flex', justifyContent: "space-between", marginTop: '-1.15%'}}>

          <div style={{width: '35%'}}>
            <FormControl fullWidth>
              <TextField label="Search for auction by address" 
                    type="text" 
                    onChange={(e) => handleSearchByAddress(e)}
                    fullWidth 
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Search style={{color: 'gray'}}/>
                        </InputAdornment>
                       )
                      }}
                    />
            </FormControl>
          </div>
          <div>
          <ToggleButtonGroup
              color="primary"
              {...control}
              exclusive
              aria-label="Platform"
              style={{height: '36px', paddingTop: '10px'}}
            >
              <ToggleButton value="myAuctions" key="myAuctions" >MY AUCTIONS</ToggleButton>
              <ToggleButton value="auctionsWon" key="auctionsWon" >AUCTIONS WON</ToggleButton>
              <ToggleButton value="myBids" key="byBids" >MY BIDS</ToggleButton>
              <ToggleButton value="activeAuctions" key="activeAuctions" >ACTIVE AUCTIONS</ToggleButton>
              <ToggleButton value="allAuctions" key="allAuctions" >ALL AUCTIONS</ToggleButton>
            </ToggleButtonGroup>
            </div>
      </CardContent>
    </Card>
  );
};

export default NavbarCard;