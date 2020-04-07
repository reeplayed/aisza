import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, use } from 'react-router-dom';
import Login from './pages/Login';
import SinglePlayer from './pages/SinglePlayer';
import {auth, db} from './firebaseConfig';
import Background from './helpers/Background'
import Menu from './pages/Menu';
import { UserContext } from './userContext';
import GameRoom from './pages/GameRoom';
import styled from 'styled-components';

class App extends Component {
  constructor(props){
    super(props)

    this.state ={
      isAuthenticated: false,
      displayName: '',
      uid: ''
    }
  }
  
  componentDidMount(){

    auth.onAuthStateChanged((user)=>{
      if(user){

          if(user.displayName){
              this.setState({
                isAuthenticated: true, 
                displayName: user.displayName,
                uid: user.uid
              })
          }
      }
      else{
          this.setState({isAuthenticated: false, displayName: ''})
      }
  })

  }

  render() {

    return (
      
      <div className='container'>
        
        <Background/>
        <UserContext.Provider value={this.state}>
          <BrowserRouter>
            {this.state.isAuthenticated ? (
              <Switch>
                <Route path='/room/:id' render={(props) => <GameRoom {...props} user={this.state} />}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/singleplayer" component={SinglePlayer} />
                <Route exact path="/menu" component={Menu}/>
              </Switch>
            ): (
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/singleplayer" component={SinglePlayer} />
              </Switch>
            )}
          </BrowserRouter>
        </UserContext.Provider>
        
      </div>  
      
    );
  }
}

export default App;
