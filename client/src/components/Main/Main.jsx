import React, { useState, useEffect, useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import Identicon from 'identicon.js';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import { Star } from '@material-ui/icons';
import InfoCard from '../InfoCard';
import { AuctionFactoryContext } from '../../context/AuctionFactoryContext';


const ExpenseTracker = (props) => {
  const classes = useStyles();
  const { currentRate } = useContext(AuctionFactoryContext);
  // const { balance } = useContext(ExpenseTrackerContext);
  // const { currentAccount } = useContext(AuctionFactoryContext);

  return (
    <Card className={classes.root} style={{height: '100%'}}>
      <CardHeader title="Simple Auction" subheader="Powered by Ethereum Blockchain" />
      <CardContent>
        <Typography align="center" variant="h5">
          <img
            className={classes.avatarImage}
            align="center"
            alt=""
            width="100"
            height="100"
            src={`data:image/png;base64,${new Identicon(
              props.currentAccount,
              100
              ).toString()}`}
          />
        </Typography>
        <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '10px', paddingTop: '6px'}}>
          <div elevation={3} style={{ textAlign: 'center', padding: '0 10%' }}>
            <Star style={{color: 'gold'}}/> {currentRate}
            <p style={{ color: "gray", wordWrap: "break-word"}}>
              {props.currentAccount}
            </p>
          </div>
        </Typography>
        <Divider className={classes.divider} />
        <Form />
      </CardContent>
      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
