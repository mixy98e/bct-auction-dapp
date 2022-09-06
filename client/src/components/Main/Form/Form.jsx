import React, { useContext } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import Snackbar from '../../Snackbar/Snackbar';
import useStyles from './styles';
import { AuctionFactoryContext } from '../../../context/AuctionFactoryContext';


const NewTransactionForm = () => {

  const { formData, createAuction, handleChange, msg, open, setOpen } = useContext(AuctionFactoryContext);

  const handleSubmit = (e) => {
    const { unitOfTime, time } = formData;
    e.preventDefault();

    if(unitOfTime && time) {
      const newAuctionAddress = createAuction(unitOfTime, time);
    }
  }

  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Snackbar open={open} setOpen={setOpen} msg={msg}/>
      <Grid item xs={12}>
      <Typography variant="subtitle1" style={{ lineHeight: '1.5em'}}>
          <div elevation={3} style={{ textAlign: 'center', color: 'gray'}}>
            Use form to create anonymus blockchain based auction.
          </div>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
            <InputLabel>Select time unit</InputLabel>
            <Select name="unitOfTime" value={formData.unitOfTime} onChange={(e) => handleChange(e, 'unitOfTime')}>
                <MenuItem value="days">Days</MenuItem>
                <MenuItem value="hours">Hours</MenuItem>
                <MenuItem value="minutes">Minutes</MenuItem>
                <MenuItem value="seconds">Seconds</MenuItem>
            </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField label="Duration of auction" type="number" name="time" value={formData.time} onChange={(e) => handleChange(e, 'time')} fullWidth />
        </FormControl>
      </Grid>
      <Button className={classes.button} variant="outlined" color="primary" onClick={handleSubmit} fullWidth>Create auction</Button>
    </Grid>
  );
};

export default NewTransactionForm;
