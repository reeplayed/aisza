import React, { Component, useContext } from 'react';
import {auth, db} from '../firebaseConfig';
import Logo from '../components/Logo';
import GradientContainer from '../helpers/LinearGradientContainer'
import Typography from '../helpers/Typography'
import styled , {css} from 'styled-components';
import _ from 'lodash';
import Button from '../helpers/Button';
import Link from '../helpers/StyledLink';
import Input from '../components/StyledInput';
import { AcceptButton, RemoveButton } from './IconButtons';
import StyledCard from './StyledCard';
import { UserContext } from '../userContext';
import { useHistory } from "react-router-dom";
import {Tooltip} from '@material-ui/core';



const NotificationCard = ({type, username, uid, game_room, status}) => {
     
    const history = useHistory()

    const user = useContext(UserContext)
    
    const infoText = type==='game' ? (
                        status==='in_game' ? (
                            'the game has already started.'
                        ) : status==='game_request' ? (
                            'wants to play with you.'
                        ): null
                    ):(
                        'wants to be your friend.'
                    )
    
    const friendResponseHandler = (agree) => {

        db.collection('invitations').doc(user.uid).collection('inv_from_uid').doc(uid).delete()

        db.collection('invitations').doc(uid).collection('inv_from_uid').doc(user.uid).delete()

        if(agree){

            db.collection('game_rooms').add({})
                    .then(({id}) => {

                        db.collection('friends').doc(user.uid).collection('friends_uid').doc(uid).set({
                            username: username,
                            game_room: id,
                            game_status: 'off'
                          })
                
                          db.collection('friends').doc(uid).collection('friends_uid').doc(user.uid).set({
                            username: user.displayName,
                            game_room: id,
                            game_status: 'off'
                          })
    
                    })
        }

    }

    const gameResponseHandler = (agree) => {
        console.log(agree, 'bac')

        if(agree){
                db.collection('game_rooms').doc(game_room).set({
                    ['ready_'+ user.uid] : false,
                    ['ready_'+ uid] : false,
                    [user.uid] : uid,
                    [uid] : user.uid,
                    ['data_'+ user.uid] : {},
                    ['data_'+ uid] : {},
                    move: user.uid,
                    winner: ''
                })
                .then(()=>{

                    history.push('/room/'+game_room)

                })

                Promise.all([
                    db.collection('game_invitations').doc(user.uid).collection('inv_from_uid').doc(uid).update({
                        username: username,
                        game_room: game_room,
                        status: 'in_game'
                    }),
                    db.collection('game_invitations').doc(uid).collection('inv_from_uid').doc(user.uid).set({
                        username: user.displayName,
                        game_room: game_room,
                        status: 'in_game'
                      })
                ])
                .catch(err=> alert(err))

                
              
                
        }
        else{
            
            Promise.all([
                db.collection('game_invitations').doc(user.uid).collection('inv_from_uid').doc(uid).delete(),
            
                db.collection('game_invitations').doc(uid).collection('inv_from_uid').doc(user.uid).delete(),

                db.collection('game_rooms').doc(game_room).delete()
            ])
            .catch(err=> alert(err))
        }

    }
    return (
        <StyledCard onClick={()=>{status==='in_game' ? history.push('/room/'+game_room) : null}} pointer={status==='in_game' && true}>
                
                <Typography fontSize='1.1rem' color='light' type='span'>
                        {username} - {infoText}
                </Typography>
            
                
                      
            
            <ButtonsWrapper>
                
                {status!=='in_game' && <AcceptButton 
                                            onclick={type==='game' ? gameResponseHandler : friendResponseHandler}
                                            tooltip='Agree'
                                            />}
               
                <RemoveButton 
                    onclick={type==='game' ? gameResponseHandler : friendResponseHandler}
                    tooltip={status==='in_game' ? 'Finish the game' : 'Disagree'}
                    />

              

            </ButtonsWrapper>

                    
        </StyledCard>
    );
};

const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 0;
    width: 70px;
    margin-top: 5px;
`;
export default NotificationCard;