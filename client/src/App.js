import React, { useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';

// import { SpeechState, useSpeechContext } from "@speechly/react-client";
// import { PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui';

import { Details, Main } from './components';
import useStyles from './styles';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const classes = useStyles();
  // const { speechState } = useSpeechContext();
  const main = useRef(null)

  const executeScroll = () => main.current.scrollIntoView()    

  // useEffect(() => {
  //   if (speechState === SpeechState.Recording) {
  //     executeScroll();
  //   }
  // }, [speechState]);

  return (
    <div style={{height: '100%'}}>
      <Grid className={classes.grid} alignItems="center" container spacing={0}  justify="center" style={{height: '100%'}}>
        <Grid ref={main} item xs={12} sm={1} className={classes.main} style={{height: '90%'}} >
          <div style={{height: '100%', width: '100%', backgroundColor: "red" }}>
          </div>
        </Grid>
        <Grid ref={main} item xs={12} sm={3} className={classes.main} style={{height: '90%'}} >
          <Main />
        </Grid>
        <Grid style={{height: '90%', width: '100%'}} item xs={12} sm={7}>
          <Grid style={{height: '10%', paddingBottom: '30px'}}>
            {/* <div style={{height: '100%', width: '100%', backgroundColor: "red" }}>
            </div> */}
            <Navbar />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.mobile} style={{height: '86%'}}>
            <Details title="Active" />
          </Grid>
            <Grid item xs={12} sm={4} className={classes.desktop}>
              <Details title="Income" />
            </Grid>
        </Grid>

        {/* <Grid item xs={12} sm={4} className={classes.last}>
          <Details title="Expense" />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default App;
