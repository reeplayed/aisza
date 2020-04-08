import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import SinglePlayer from './pages/SinglePlayer';
import {auth, db} from './firebaseConfig';
import Menu from './pages/Menu';
import { UserContext } from './userContext';
import GameRoom from './pages/GameRoom';
import styled from 'styled-components';
import LoadingComponent from './components/LoadingComponent';

class App extends Component {
  constructor(props){
    super(props)

    this.state ={
      isAuthenticated: false,
      displayName: '',
      uid: '',
      loading: true
    }
  }
  
  componentWillMount(){

    auth.onAuthStateChanged((user)=>{
      if(user){

          if(user.displayName){
              this.setState({
                isAuthenticated: true, 
                displayName: user.displayName,
                uid: user.uid,
                loading: false
              })
          }
      }
      else{
          this.setState({isAuthenticated: false, displayName: '', loading: false})
      }
  })

  }

  render() {

    if (this.state.loading) {
      return <LoadingComponent/>;
    }
    return (
      <div className='container'>
        <UserContext.Provider value={this.state}>
          <BrowserRouter>
                <Route path="/" render={(props) => this.state.isAuthenticated ? <Menu {...props} user={this.state}/> : <Redirect to="/login" />}/>
                <Route path='/room/:id' render={(props) => <GameRoom {...props} user={this.state} />}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/singleplayer" component={SinglePlayer} />
          </BrowserRouter>
        </UserContext.Provider>
      </div>  
    );
  }
}

export default App;
