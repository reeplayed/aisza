import React, { Component, useContext } from 'react';
import { auth, db } from '../firebaseConfig';
import Typography from '../helpers/Typography';
import styled, { css } from 'styled-components';
import _ from 'lodash';
import { GameRequestButton, BinButton } from './IconButtons';
import StyledCard from './StyledCard';
import { UserContext } from '../userContext';
import Snackbar from '@material-ui/core/Snackbar';

const FriendsCard = ({ username, uid, game_room }) => {
  const user = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const sendInvitationForGameHandler = () => {
    db.collection('game_invitations')
      .doc(user.uid)
      .collection('inv_from_uid')
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          setMessage('You have already invited this user.');
          setOpen(true);
        } else {
          return db
            .collection('game_invitations')
            .doc(uid)
            .collection('inv_from_uid')
            .doc(user.uid)
            .set({
              username: user.displayName,
              game_room: game_room,
              status: 'game_request',
            })
            .then(() => {
              setMessage('Send invite.');
              setOpen(true);
            });
        }
      })
      .catch(err => alert(err));
  };

  const removeFriendHandler = () => {
    Promise.all([
      db
        .collection('friends')
        .doc(user.uid)
        .collection('friends_uid')
        .doc(uid)
        .delete(),
      db
        .collection('friends')
        .doc(uid)
        .collection('friends_uid')
        .doc(user.uid)
        .delete(),
    ]).catch(err => alert(err));
  };

  return (
    <>
      <StyledCard>
        <Typography fontSize="1.1rem" color="light" type="span">
          {username}
        </Typography>

        <ButtonsWrapper>
          <GameRequestButton
            onclick={sendInvitationForGameHandler}
            tooltip="Invite to game"
          />

          <BinButton onclick={removeFriendHandler} tooltip="Remove friend" />
        </ButtonsWrapper>
      </StyledCard>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
        open={open}
        autoHideDuration={4000}
        message={message}
      />
    </>
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
