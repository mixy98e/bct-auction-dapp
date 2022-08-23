import React from 'react';
import { Card, CardHeader, CardContent, Button } from '@material-ui/core';
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
      <CardContent container style={{justifyContent:'space-around', display:'flex'}}>
        {/* <Typography variant="h5">${total}</Typography> */}
        {/* <Doughnut data={chartData} /> */}
        <Button className={classes.button} variant="contained" color="primary" onClick={ (e) => selectCategory(e)}>My auctions</Button>
        <Button className={classes.button} variant="outlined" color="primary" onClick={ (e) => selectCategory(e)}>All auctions</Button>
        <Button className={classes.button} variant="outlined" color="primary" onClick={ (e) => selectCategory(e)}>Active auctions</Button>
        {/* <Button className={classes.button} variant="outlined" color="primary" onClick={ (e) => selectCategory(e)}>Voted auctions</Button> */}
      </CardContent>
    </Card>
  );
};

export default NavbarCard;