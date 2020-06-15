import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { sizing } from '@material-ui/system';
import Typography from  '@material-ui/core/Typography';
import Contenido from '../components/ContentNews';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: "#fff",
    background: '#303030'
  }
}));

export default function Head(props){
  
    console.log("las props que legaron on: ", props);
    const classes = useStyles();
    const subtitle = "We <3 hacker news!";
    
    return (
      <div className={classes.root}>
          <Grid container spacing={0} >
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h1">
                    HN Feed
                  </Typography>
                  <Typography variant="h2">
                      {subtitle}
                  </Typography>
                </Paper>
              </Grid>
              <Grid container spacing={0}  alignItems="center" justify="center">
                <Contenido posts={props} />
              </Grid>
          </Grid>
      </div>
    );
}


