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
import { GameRequestButton, BinButton } from './IconButtons';
import StyledCard from './StyledCard';
import {UserContext} from '../userContext';


const FriendsCard = ({username, uid, game_room}) => {

    const user = useContext(UserContext)

    const sendInvitationForGameHandler = () => {

        db.collection('game_invitations').doc(user.uid).collection('inv_from_uid').doc(uid).get()
            .then((doc)=>{
                if(doc.exists){
                    alert('you have already invited this user.')
                }
                else{

                   return db.collection('game_invitations').doc(uid).collection('inv_from_uid').doc(user.uid).set({
                        username: user.displayName,
                        game_room: game_room,
                        status: 'game_request'
                      })
                }
            })
            .catch((err)=> alert(err))
    }

    const removeFriendHandler = () =>{

        Promise.all([
            db.collection('friends').doc(user.uid).collection('friends_uid').doc(uid).delete(),
            db.collection('friends').doc(uid).collection('friends_uid').doc(user.uid).delete()
        ])
        .catch(err=>alert(err))
    }

    return (
        <StyledCard>
            

                        <Typography fontSize='1.1rem' color='light' type='span'>
                            {username}
                        </Typography>

                        <ButtonsWrapper>
                            <GameRequestButton onclick={sendInvitationForGameHandler}/>
                            <BinButton onclick={removeFriendHandler}/>
                        </ButtonsWrapper>
               
           
        </StyledCard>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 10px;

`;
const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 0;
    width: 70px;
    margin-top: 5px;
`;
export default FriendsCard;