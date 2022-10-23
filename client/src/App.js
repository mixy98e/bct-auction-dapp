import React, { useContext, useEffect, useRef } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Details, Main } from './components';
import useStyles from './styles';
import Navbar from './components/Navbar/Navbar';
import { AuctionFactoryContext } from './context/AuctionFactoryContext';



const App = () => {
  const classes = useStyles();
  const main = useRef(null);

  const { connectWallet, currentAccount } = useContext(AuctionFactoryContext);

  return (
    <div style={{height: '100%'}}>
      {currentAccount && (
        <Grid className={classes.grid} alignItems="center" container spacing={0}  justify="center" style={{height: '100%'}}>
          {/* <Grid ref={main} item xs={12} sm={1} className={classes.main} style={{height: '90%'}} >
            <div style={{height: '100%', width: '100%', backgroundColor: "black", borderRadius: '5px' }}>
            </div>
          </Grid> */}
          <Grid ref={main} item xs={12} sm={4} className={classes.main} style={{height: '90%'}} >
            <Main currentAccount={currentAccount}/>
          </Grid>
          <Grid style={{height: '90%', width: '100%'}} item xs={12} sm={7}>
            <Grid style={{height: '10%', paddingBottom: '30px'}}>
              <Navbar />
            </Grid>
            <Grid item xs={12} sm={12} className={classes.mobile} style={{height: '86%'}}>
              <Details title="Active" />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.desktop}>
                <Details title="Income" />
            </Grid>
          </Grid>
        </Grid>
      )}

      {!currentAccount && (
        <Grid className={classes.grid} alignItems="center" container spacing={0}  justify="center" style={{height: '100%'}}>
          <Grid ref={main} item xs={3} sm={1} className={classes.main} style={{height: '90%'}} >
            No metamask found!<br />
            <button onClick={connectWallet}>test connect</button>
            <p>{currentAccount}</p>
          </Grid>
        </Grid>
      )}
      
    </div>
  );
};

export default App;
