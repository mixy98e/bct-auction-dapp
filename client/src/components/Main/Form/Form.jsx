import React, { useState, useContext, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, ComboBox, createChainedFunction } from '@material-ui/core';

import Snackbar from '../../Snackbar/Snackbar';
import formatDate from '../../../utils/formatDate';
import useStyles from './styles';
import { AuctionFactoryContext } from '../../../context/AuctionFactoryContext';

const initialState = {
  amount: '',
  category: '',
  type: 'hours',
  date: formatDate(new Date()),
};

const NewTransactionForm = () => {

  const { formData, createAuction, handleChange } = useContext(AuctionFactoryContext);

  const handleSubmit = (e) => {
    const { unitOfTime, time } = formData;
    e.preventDefault();

    if(unitOfTime && time) {
      console.log("uso");
      const newAuctionAddress = createAuction(unitOfTime, time);
      //setNewCreatedAuction(newAuctionAddress);
    }
  }

  const classes = useStyles();
  // const { addTransaction } = useContext(ExpenseTrackerContext);
  // const [formData, setFormData] = useState(initialState);
  // const { segment } = useSpeechContext();
  const [open, setOpen] = React.useState(false);

  /* const [ newCreatedAuction, setNewCreatedAuction ] = React.useState(''); */

  // const createTransaction = () => {
  //   if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

  //   if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
  //     setFormData({ ...formData, type: 'Income' });
  //   } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
  //     setFormData({ ...formData, type: 'Expense' });
  //   }

  //   setOpen(true);
  //   addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
  //   setFormData(initialState);
  // };

  // useEffect(() => {
  //   if (segment) {
  //     if (segment.intent.intent === 'add_expense') {
  //       setFormData({ ...formData, type: 'Expense' });
  //     } else if (segment.intent.intent === 'add_income') {
  //       setFormData({ ...formData, type: 'Income' });
  //     } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
  //       return createTransaction();
  //     } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
  //       return setFormData(initialState);
  //     }

  //     segment.entities.forEach((s) => {
  //       const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;

  //       switch (s.type) {
  //         case 'amount':
  //           setFormData({ ...formData, amount: s.value });
  //           break;
  //         case 'category':
  //           if (incomeCategories.map((iC) => iC.type).includes(category)) {
  //             setFormData({ ...formData, type: 'Income', category });
  //           } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
  //             setFormData({ ...formData, type: 'Expense', category });
  //           }
  //           break;
  //         case 'date':
  //           setFormData({ ...formData, date: s.value });
  //           break;
  //         default:
  //           break;
  //       }
  //     });

  //     if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
  //       createTransaction();
  //     }
  //   }
  // }, [segment]);

  // const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Snackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
      <Typography variant="subtitle1" style={{ lineHeight: '1.5em'}}>
          <div elevation={3} style={{ textAlign: 'center', color: 'gray'}}>
            Use form to create anonymus blockchain based auction.
          </div>
        </Typography>
      </Grid>
      {/* <Grid item xs={2}></Grid> */}
      {/* <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField label="Duration of the auction" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} fullWidth />
        </FormControl>
      </Grid> */}
      {/* <Grid item xs={2}></Grid> */}
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




      {/* <Grid item xs={6}>
        <TextField type="number" label="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
      </Grid> */}
      <Button className={classes.button} variant="outlined" color="primary" onClick={handleSubmit} fullWidth>Create auction</Button>
      {/* { newCreatedAuction !== '' && (<Typography variant="subtitle1" style={{ lineHeight: '1.5em', paddingTop: '6px'}}>
          <div elevation={3} style={{ textAlign: 'center', color: 'gray'}}>
            {newCreatedAuction}
          </div>
        </Typography>)} */}
    </Grid>
  );
};

export default NewTransactionForm;
