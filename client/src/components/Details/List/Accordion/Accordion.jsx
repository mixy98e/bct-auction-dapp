import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ListItemText, Grid } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { AuctionFactoryContext } from '../../../../context/AuctionFactoryContext';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  smallFont: {
    fontSize: '10pt',
    color: 'gray'
  }
}));

export default function ControlledAccordions({auctionDetails}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { auctionBidders } = useContext(AuctionFactoryContext);



  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}><ListItemText secondary="Show details" style={{color: blue[500]}}/></Typography>
          <Typography className={classes.secondaryHeading}><ListItemText secondary={`Highest bidder: ${auctionDetails.highestBidder}`} /></Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography className={classes.smallFont}>
                <strong>Owner:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {auctionDetails.beneficiary} <br />
                <strong>Address:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {auctionDetails.address} <br />
                <strong>Price:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {auctionDetails.highestBid} ETH <br />
                <strong>Bidder:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {auctionDetails.highestBidder} <br />
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div style={{width : '100%'}}>

            </div>
          </Grid>
        </Grid>
          {auctionBidders !== undefined && 
          auctionBidders.get(auctionDetails.address) !== undefined && 
          auctionBidders.get(auctionDetails.address).map((bidder) => (
            <p>bidder</p>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
