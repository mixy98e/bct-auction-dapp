import React from 'react';
import { Card, CardHeader, CardContent, Typography, Button, Grid, FormControl, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
// import { Doughnut } from 'react-chartjs-2';
import useStyles from './styles';
import useTransactions from '../../useTransactions';

const NavbarCard = ({ title, subheader }) => {
  const { total, chartData } = useTransactions(title);
  const classes = useStyles();

  const selectCategory = (e) => {
    
  }

  return (
    <Card className={title === 'Active' ? classes.active : classes.expense}>
      {/* <CardHeader title={title} subheader={subheader} /> */}
      <CardContent container style={{flexWrap: "wrap", display:'flex', justifyContent: "space-between"}}>

          <div style={{width: '35%'}}>
            <FormControl fullWidth>
              <TextField label="Search for auction by address" type="text" /*value={} onChange={(e) => setFormData({ ...formData, timeToEnd: e.target.value })}*/ fullWidth />
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
              <ToggleButton value="web" selected="true">MY AUCTIONS</ToggleButton>
              <ToggleButton value="android">ALL AUCTIONS</ToggleButton>
              <ToggleButton value="ios">ACTIVE AUCTIONS</ToggleButton>
            </ToggleButtonGroup>
            </div>
      </CardContent>
    </Card>
  );
};

export default NavbarCard;