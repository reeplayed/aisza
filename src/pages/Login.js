import React, { Component } from 'react';
import {auth, db} from '../firebaseConfig';
import Logo from '../components/Logo';
import GradientContainer from '../helpers/LinearGradientContainer'
import Typography from '../helpers/Typography'
import styled from 'styled-components';
import _ from 'lodash';
import Button from '../helpers/Button';
import Link from '../helpers/StyledLink';
import Input from '../components/StyledInput';

class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            confirm_password: '',
            registrationMode: false,
            error: ''
        }
    }
   
    signUpHandler = e =>{
        e.preventDefault()

        const {username, password, confirm_password, registrationMode} = this.state

        if(registrationMode===false){
            this.setState({
                username:'',
                password: '',
                error: '',
                registrationMode: true
            })
            return 
          }
  
          if(!username || !password || !confirm_password){
            return this.setState({error: "Field can't be empty."})
          }
  
          if(password !== confirm_password){
            return this.setState({error: "Password and confirm password does not match."})
          }
          
          auth.createUserWithEmailAndPassword(username+'@like.thc', password)
                  .then((authData) => {
                     Promise.all([
                        
                        db.collection('users').doc(authData.user.uid).set({
                          email: authData.user.email,
                          username: username
                        }),
                      
                        db.collection('usernames').doc(username).set({uid: authData.user.uid}),
                       
                        auth.currentUser.updateProfile({
                              displayName: username
                            })
                        ])
                        .then( this.props.history.push('/'))
                  })
                  .catch(err=>this.setState({error: err.message}))
    }

    signInHandler = e => {
        e.preventDefault()

        const {username, password, confirm_password, registrationMode} = this.state

        if(registrationMode===true){
            this.setState({
                username:'',
                password: '',
                confirm_password: '',
                error: '',
                registrationMode: false
            })
            return 
        }
  
        if(!username || !password){
            return this.setState({error: "Field can't be empty."})
          }
  
        auth.signInWithEmailAndPassword(username+'@like.thc', password)
          .then((authData) => {
              console.log("User created successfully with payload-", authData);
              this.props.history.push('/')
          }).catch((_error) => {
            this.setState({error: _error.message})
              console.log("Login Failed!", _error);
          })
    }

    onChangeHandler = (e) => this.setState({[e.target.name]: e.target.value})
    
   

    render() {

        const {username, password, confirm_password, registrationMode, error} = this.state
       
        return (
            <Container>
                <LogoWrapper>
                    <Logo/>
                </LogoWrapper>
                <GradientContainer flexDirection='column' padding='30px 0'>
                    <form autoComplete='off'>
                        <FormContainer>

                            <InputWrapper>
                                <Typography fontSize='1.2rem' type='label' color='light'>
                                    Username
                                </Typography>
                                <Input 
                                    type='text'
                                    name='username'
                                    value={username}
                                    onChange={this.onChangeHandler}/>
                            </InputWrapper>

                            <InputWrapper>
                                <Typography fontSize='1.2rem' type='label' color='light'>
                                    Password
                                </Typography>
                                <Input 
                                    type='password'
                                    name='password'
                                    value={password}
                                    onChange={this.onChangeHandler}/>
                            </InputWrapper>


                            {registrationMode && (

                                <InputWrapper>
                                    <Typography fontSize='1.2rem' type='label' color='light'>
                                        Confirm Password
                                    </Typography>
                                    <Input 
                                        type='password'
                                        name='confirm_password'
                                        value={confirm_password}
                                        onChange={this.onChangeHandler}/>
                                </InputWrapper>
                            
                            )}

                            <Typography fontSize='1rem' type='label' color='light'>
                                    {error}
                            </Typography>

                            <ButtonWrapper>
                                <Button onClick={e => this.signInHandler(e)}>
                                    <Typography fontSize='1.2rem' color='light' type='span'>
                                        Sign In
                                    </Typography>
                                </Button>
                            </ButtonWrapper>

                            <ButtonWrapper>
                                <Button onClick={e => this.signUpHandler(e)}>
                                    <Typography fontSize='1.2rem' color='light' type='span'>
                                        Sign Up
                                    </Typography>
                                </Button>
                            </ButtonWrapper>

                        </FormContainer>
                    </form>               
                    {/* <ButtonWrapper>
                        <Button>
                            <Typography fontSize='1.2rem' color='light' type='span'>
                                Sign In with Google
                            </Typography>
                        </Button>
                    </ButtonWrapper> */}
                    <Typography fontSize='1.1rem' color='light' type='span'>
                        OR
                    </Typography>  
                    
                    <ButtonWrapper>
                        <Link to='/singleplayer/'>
                        <Button background='button_gradient'>
                            <Typography fontSize='1.2rem' color='dark' type='span'>
                                Single game
                            </Typography>
                        </Button>
                        </Link>
                    
                    </ButtonWrapper>
                </GradientContainer>
            </Container>
        );
    }
}


const InputWrapper = styled.div`
    width: 260px;   
    margin-bottom: 10px ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Container = styled.main`
    max-width: 500px;
    margin: 50px auto;
    
`
const LogoWrapper = styled.div`
    margin-bottom: 10px;
`
const FormContainer = styled.main`
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ButtonWrapper = styled.div`
    margin: 8px 0 ;
    width: 200px;
`;

export default Login;