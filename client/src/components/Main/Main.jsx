import React, { useState, useEffect, useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import Identicon from 'identicon.js';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';

const ExpenseTracker = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);

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
              '0xc0ffee254729296a45a3885639AC7E10F9d54979',
              100
              ).toString()}`}
          />
        </Typography>
        <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px', paddingTop: '6px'}}>
          <div elevation={3} style={{ textAlign: 'center', padding: '0 10%' }}>
            You're address:
            <p style={{ color: "gray", wordWrap: "break-word"}}>
              0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E
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
