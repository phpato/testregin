import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Head from './components/Head';

class Cuerpo extends Component {

    constructor (props) {
      super(props); 
      this.state = {posts:[]}

  }

  eliminarPost(){

      axios.delete('http://localhost:3000/post',{
          mode: 'no-cors'
      })
      .then(response => {
        console.log("respuesta eliminar post: ", response);
        //this.setState({ posts: response.data.posts });

      })
      .catch(error => {
        console.log(error);
      });

  }
  componentDidMount() {

    this.listarPosts();

  }
  render() {
    return (
      <div>
          hola mundo
      </div>
    );
  }
}

export default Cuerpo;
