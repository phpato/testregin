import React, { Component } from 'react';

import './App.css';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from  '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import './components/HolaMundo.css';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import moment from 'moment';

class App extends Component {

    constructor (props) {
      super(props); 
      this.state = {posts:[], visibleDelete: ''}

  }

  listarPosts(){

      axios.get('https://young-caverns-68509.herokuapp.com/post',{
          mode: 'no-cors'
      })
      .then(response => {
        console.log("los posts soon: ", response);
        this.setState({ posts: response.data.posts });

      })
      .catch(error => {
        console.log(error);
      });

  }
  seedDatabase(e){

    e.preventDefault();
    axios.get('https://young-caverns-68509.herokuapp.com/seed_database',{
      mode: 'no-cors'
    })
    .then(response => {

      this.listarPosts();
      Swal.fire({
        title: 'Success',
        text: "BD charged!",
        icon: 'success',
        showCancelButton: false
      });
    })
    .catch(error => {
      console.log(error);
    });

  }

  cleanDatabase(e){

    e.preventDefault();
    axios.get('https://young-caverns-68509.herokuapp.com/clean_database')
    .then(response => {
 
      this.listarPosts();
      Swal.fire({
        title: 'Success',
        text: "All posts has been deleted!",
        icon: 'success',
        showCancelButton: false
      });
    })
    .catch(error => {
      console.log(error);
    });

  }

  deletePost(e,post){

    e.preventDefault();
    Swal.fire({
      title: 'Are you sure to delete this post?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        axios.delete(`https://young-caverns-68509.herokuapp.com/post/${post._id}`)
        .then(response => {
          console.log("los posts soon: ", response);
          Swal.fire({
            title: 'Success',
            text: "Post deleted!",
            icon: 'success',
            showCancelButton: false
          });
          this.listarPosts();
    
        })
        .catch(error => {
          console.log(error);
        });
      }
    })
  }

  componentDidMount() {

    this.listarPosts();

  }

  formatCreated(date){
    if(moment(date).format("DD") == moment().format("DD") ){
      
      return moment(date).format("hh:mm A");
    
    }else{
      
      if(moment(date).format('DD' == moment().add(-1, 'days'))){

        return "Yesterday";
        
      }

      return moment(date).format("MMMM,DD");
    }
  }

  rowSelected(e,row){

    e.preventDefault();
    console.log("la fila clickeada es: ", row);
    this.visibleDelete = row._id;
    window.open(row.story_url, "_blank"); 
  }

  render() {

    const estilos = {
      root: {
        flexGrow: 1,
      },
      paper: {
        textAlign: 'left',
        color: "#fff",
        background: '#303030',
      },
      news:{
        borderBottom: "1px solid #ccc",
        heigth: "200px",
        '&:hover': {
          background: '#fafafa',
          
        },
        cursor: 'pointer'
      },
      delete:{
        display:"none",
        '&:hover': {
          display: 'inline',
          background: 'red'
        }
      }
    };
    const posts = this.state.posts;
    const subtitle = "We <3 hacker news!";

    return (
      <div className="App">
       
            <div className={estilos.root}>
            <Grid container spacing={0} >
                <Grid item xs={12}>
                  <Paper style={estilos.paper}>
                    <Typography variant="h1">
                      HN Feed 
                    </Typography>
                    <Typography variant="h2">
                        {subtitle}
                    </Typography>
                  </Paper>
                </Grid>
                
                  <Grid container spacing={0}  alignItems="center" justify="center" >
                        {posts.map((e) => (
                            <Grid key={e._id} container justify="center" alignItems="center" spacing={0} style={estilos.news} >
                        
                              <Grid item xs={8} onClick={event => this.rowSelected(event,e)}  container alignItems="center" justify="center" style={{height:"100px"}}>
                             
                                <Typography  type="span">
                                  {e.title} 
                                </Typography>
                                <Typography   className="author">
                                  -{e.author}-
                                </Typography>
                            
                              </Grid>
                              
                              <Grid item xs={3} onClick={event => this.rowSelected(event,e)}  align="center">
                                {this.formatCreated(e.created_at)}
                              </Grid>
  
                              <Grid item xs={1} align="center" >
                                <IconButton aria-label="delete"  onClick={event => this.deletePost(event,e)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                            
                         
                        ))}
          
                  </Grid>
                  <Grid container spacing={0}  alignItems="center" justify="center" >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={event => this.seedDatabase(event)}
                      >
                        Seed Data
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={event => this.cleanDatabase(event)}
                      >
                        Delete All Records
                      </Button>
                  </Grid>
                   
            </Grid>
        </div>

      </div>
    );
  }
}

export default App;
