import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from  '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import "../components/HolaMundo.css";

class MiBoton extends React.Component {
  constructor(props) { 
      super(props);
      this.state.style = { background: 'blue', color: 'white' };  
  }
  render () {
      return (
         <button {...this.props} style={this.state.styles} />
      );
  }
}