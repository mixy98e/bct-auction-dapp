import React from 'react';
import { Card, CardHeader, CardContent, Typography, Button, Grid, FormControl, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

// import { Doughnut } from 'react-chartjs-2';
import useStyles from './styles';
import useTransactions from '../../useTransactions';

const NavbarCard = ({ title, subheader }) => {
  const { total, chartData } = useTransactions(title);
  const classes = useStyles();

  const selectCategory = (e) => {
    
  }

  return (
    <Card className={classes.active}>
      {/* <CardHeader title={title} subheader={subheader} /> */}
      <CardContent container style={{flexWrap: "wrap", display:'flex', justifyContent: "space-between", marginTop: '-1.15%'}}>

          <div style={{width: '35%'}}>
            <FormControl fullWidth>
              <TextField label="Search for auction by address" 
                    type="text" 
                    /*value={} onChange={(e) => setFormData({ ...formData, timeToEnd: e.target.value })}*/ 
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


          

          {/* <Typography variant="h5">${total}</Typography> */}
          {/* <Doughnut data={chartData} /> */}
          {/* <Button className={classes.button} variant="contained" color="primary" onClick={ (e) => selectCategory(e)}>My auctions</Button>
          <Button className={classes.button} variant="outlined" color="primary" onClick={ (e) => selectCategory(e)}>All auctions</Button>
          <Button className={classes.button} variant="outlined" color="primary" onClick={ (e) => selectCategory(e)}>Active auctions</Button> */}
          {/* <Button className={classes.button} variant="outlined" color="primary" onClick={ (e) => selectCategory(e)}>Voted auctions</Button> */}
            

          <div>
          <ToggleButtonGroup
              color="primary"
              // value={}
              exclusive
              // onChange={}
              aria-label="Platform"
              style={{height: '36px', paddingTop: '10px'}}
            >
              <ToggleButton value="myAuctions" selected="true">MY AUCTIONS</ToggleButton>
              <ToggleButton value="myBids" selected="true">MY BIDS</ToggleButton>
              <ToggleButton value="allAuctions">ALL AUCTIONS</ToggleButton>
              <ToggleButton value="activeAuctions">ACTIVE AUCTIONS</ToggleButton>
            </ToggleButtonGroup>
            </div>
      </CardContent>
    </Card>
  );
};

export default NavbarCard;