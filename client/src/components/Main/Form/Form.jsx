import React, { useState, useContext, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

// import { useSpeechContext } from '@speechly/react-client';
import Snackbar from '../../Snackbar/Snackbar';
import formatDate from '../../../utils/formatDate';
import { ExpenseTrackerContext } from '../../../context/context';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import useStyles from './styles';

const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
};

const NewTransactionForm = () => {
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setFormData] = useState(initialState);
  // const { segment } = useSpeechContext();
  const [open, setOpen] = React.useState(false);

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

    if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
      setFormData({ ...formData, type: 'Income' });
    } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
      setFormData({ ...formData, type: 'Expense' });
    }

    setOpen(true);
    addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
    setFormData(initialState);
  };

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

  const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Snackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>

      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} fullWidth />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField label="Price" value={formData.address} onChange={(e) => setFormData({ ...formData, price: e.target.value })} fullWidth />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField label="Time to End" value={formData.timeToEnd} onChange={(e) => setFormData({ ...formData, timeToEnd: e.target.value })} fullWidth />
        </FormControl>
      </Grid>




      {/* <Grid item xs={6}>
        <TextField type="number" label="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
      </Grid> */}
      <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
    </Grid>
  );
};

export default NewTransactionForm;
