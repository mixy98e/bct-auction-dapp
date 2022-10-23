import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import List from './List/List';

import useStyles from './styles';

const DetailsCard = ({ title, subheader }) => {
  const classes = useStyles();

  return (
    <Card className={title === 'Active' ? classes.active : classes.expense}>
      <CardContent>
        <List />
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
