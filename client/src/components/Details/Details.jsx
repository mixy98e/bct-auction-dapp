import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import List from './List/List';
// import { Doughnut } from 'react-chartjs-2';

import useStyles from './styles';
import useTransactions from '../../useTransactions';

const DetailsCard = ({ title, subheader }) => {
  const { total, chartData } = useTransactions(title);
  const classes = useStyles();

  return (
    <Card className={title === 'Active' ? classes.active : classes.expense}>
      {/* <CardHeader title={title} subheader={subheader} /> */}
      <CardContent>
        {/* <Typography variant="h5">${total}</Typography> */}
        {/* <Doughnut data={chartData} /> */}
        <List />
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
