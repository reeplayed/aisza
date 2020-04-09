import React, {useEffect, useContext, useState} from 'react';
import GradientContainer from '../helpers/LinearGradientContainer';
import Typography from '../helpers/Typography';
import styled from 'styled-components';
import Input from '../components/StyledInput';
import Button from '../helpers/Button'
import {LogoutButton} from '../components/IconButtons';
import Link from '../helpers/StyledLink';
import FriendsCard from '../components/FriendsCard';
import NotificationCard from '../components/NotificationCard'
import {auth, db} from '../firebaseConfig'
import { UserContext } from '../userContext';
import _ from 'lodash';

const Menu = (props) => {

    const logoutHandler = () => {
        console.log(props)
        props.history.push('/login')
        auth.signOut()
    }

    const user = props.user

    const [addFriendInput, setInputValue] = useState('')
    const [error, setError] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [friendRequests, setFriendRequests] = useState([])
    const [gameInvitations, setGameInvitiaions] = useState([])

    useEffect(()=>{

        db.collection("invitations").doc(user.uid).collection('inv_from_uid')
          .onSnapshot(function(querySnapshot) {
              
            let list = [];
            
            querySnapshot.forEach(function(doc) {
                const data = doc.data()
                data.uid = doc.id
                list.push(data)
              });
              
            setFriendRequests(list)
            
          });
  
          db.collection("friends").doc(user.uid).collection('friends_uid')
          .onSnapshot(function(querySnapshot) {
              
            let list = [];
            
            querySnapshot.forEach(function(doc) {
              const data = doc.data()
              data.uid = doc.id
              list.push(data)
              });
              
            setFriendsList(list)
            
          });
  
          db.collection("game_invitations").doc(user.uid).collection('inv_from_uid')
          .onSnapshot(function(querySnapshot) {
              
            let list = [];
            
            querySnapshot.forEach(function(doc) {
              const data = doc.data()
              data.uid = doc.id
              list.push(data)
              });
              
            setGameInvitiaions(list)
            
          });
  
      },[])

    const sendFriendRequestHandler = () => {
      
        if(!addFriendInput){
          return setError('This field is empty.')
        }

        if(addFriendInput===user.displayName){
          return setError("You can't invite yourself.")
        }
  
        db.collection("usernames").doc(addFriendInput).get().then(doc=> {
          if (doc.exists) {
              
              db.collection('invitations').doc(user.uid).collection('inv_from_uid').doc(doc.data().uid).get()
                .then(document=>{
  
                  if(document.exists){

                    db.collection('game_rooms').add({})
                      .then(({id}) => {
  
                        Promise.all([

                          db.collection('invitations').doc(user.uid).collection('inv_from_uid').doc(doc.data().uid).delete(),
                          
                          db.collection('friends').doc(user.uid).collection('friends_uid').doc(doc.data().uid).set({
                            username: addFriendInput,
                            game_room: id,
                            game_status: 'off'
                          }),
                          
                          db.collection('friends').doc(doc.data().uid).collection('friends_uid').doc(user.uid).set({
                            username: user.displayName,
                            game_room: id,
                            game_status: 'off'
                          })
                        ])
                        .catch(err=>alert(err))  
                      })
                  }
  
                  else{
  
                    db.collection('friends').doc(user.uid).collection('friends_uid').doc(doc.data().uid).get()
                      .then((docmnt)=>{
                        
                        if(docmnt.exists){
                            setError('This user is already your firiend.')
                        }
  
                        else{
                          console.log(doc.data())
                          db.collection('invitations').doc(doc.data().uid).collection('inv_from_uid').doc(user.uid).set({
                            username: user.displayName
                          })
                        }
                      })
                      .catch(err=>setError(err.message))
                  }
                })
                .catch(err=>{
                  setError("Connection errorer.")
                })
          } else {
              setError("User with that username doesn't exists.")
          }
          }).catch(function(error) {
            setError("Connection error.")
          });
    }
    const friendsListComponent = friendsList.map((user)=> <FriendsCard username={user.username} uid={user.uid} game_room={user.game_room} />)
    
    
    return (
        <MainContainer>
            <LogoutButton onclick={logoutHandler}/>
            
            <GradientContainer>
                <Typography fontSize='2rem' color='gradient'>
                    Welcome {user.displayName}
                </Typography>
            </GradientContainer>
            
            <NotificationsContainer>
              {gameInvitations.map((user) => <NotificationCard 
                                                type='game'
                                                username={user.username} 
                                                uid={user.uid} 
                                                game_room={user.game_room} 
                                                status={user.status}
                                                />)
                                              }

              {friendRequests.map((user) => <NotificationCard type='friend_request' username={user.username} uid={user.uid}/>)}
                
            </NotificationsContainer>
           
            <AddFriendContainer>
                <GradientContainer flexDirection='column' justify='space-around'>
                    <Typography fontSize='1.2rem' color='light' type='span'>
                        Invite a friend
                    </Typography>
                    
                    <InputWrapper>
                        
                        <Input 
                            value={addFriendInput}
                            onChange={(e)=>setInputValue(e.target.value)}/>
                    
                    </InputWrapper>
                    
                    <Typography fontSize='1rem' color='light' type='span'>
                        {error}
                    </Typography>

                    <ButtonsWrapper>
                        
                        <Button width='130px' onClick={sendFriendRequestHandler}>
                            <Typography fontSize='1.2rem' color='light' type='span'>
                                Send invite
                            </Typography>
                        </Button>
                        
                        <Wrapper>
                          <Typography fontSize='1.1rem' color='light' type='span'>
                              OR
                          </Typography>
                        </Wrapper>  
                        
                        <Link to='/singleplayer/'>
                        <Button background='button_gradient' width='140px'>
                            <Typography fontSize='1.2rem' color='dark' type='span'>
                                Single game
                            </Typography>
                        </Button>
                        </Link>
                    
                    </ButtonsWrapper>
                
                </GradientContainer>
            </AddFriendContainer>
           
            
            <FriendsListContainer>
                <GradientContainer flexDirection='column' padding='5px 13px' >
                    
                    <HeadingWrapper>
                        <Typography fontSize='1.2rem' color='light' type='span'>
                            Friend list
                        </Typography>
                    </HeadingWrapper>
                    
                    {_.isEmpty(friendsList) ? (
                       <Typography fontSize='1rem' color='light' type='span'>
                        -----------------------  Empty  -----------------------
                        </Typography> 
                    ):(
                      friendsListComponent
                    )}
                   
                </GradientContainer>
            </FriendsListContainer>
        </MainContainer>
    );
};
const MainContainer = styled.main`
    max-width: 500px;
    margin:50px auto;
`;
const Wrapper = styled.div`
  margin: 0 4px;
`;
const ButtonsWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    wrap: wrap;
    width: 100%;
`;

const InputWrapper = styled.div`
    width: 95%;   

`
const AddFriendContainer = styled.section`
    margin-top: 10px;
    height: 160px;
`;
const FriendsListContainer = styled.section`
    margin-top: 10px;
`;
const HeadingWrapper = styled.div`
    margin: ${({margin})=>margin ? margin : '5px 0 15px 0'};
`;
const NotificationsContainer = styled.section`
    margin-top: 10px;
    width:100%;
`;
export default Menu;