import React, { useState, useEffect, useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import Identicon from 'identicon.js';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';
import { AuctionFactoryContext } from '../../context/AuctionFactoryContext';


const ExpenseTracker = (props) => {
  const classes = useStyles();
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
            width="50"
            height="50"
            src={`data:image/png;base64,${new Identicon(
              props.currentAccount,
              50
              ).toString()}`}
          />
        </Typography>
        <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '10px', paddingTop: '6px'}}>
          <div elevation={3} style={{ textAlign: 'center', padding: '0 10%' }}>
            You're address:
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
