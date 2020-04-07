import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import {db} from '../firebaseConfig';
import { LinearProgress, PointsProgress } from '../components/Progress';
import Board from '../components/Board';
import styled from 'styled-components'
import Button from '../helpers/Button'
import Typography from '../helpers/Typography'
import axios from '../axios';
import _ from 'lodash';
import { MenuButton } from '../components/IconButtons';


class GameRoom extends Component {
    constructor(props){
        super(props)

        this.state = {
            error: '',
            loading: true,
            buttonLoading: false,
            choice_data: {}
        }
        this.room_id = this.props.match.params.id
        this.user = this.props.user
    }

    

    componentDidMount(){

        const id = this.props.match.params.id

        db.collection("game_rooms").doc(id)
            .onSnapshot((doc)=> {
                if(doc.exists){
                    var source = doc.metadata.hasPendingWrites;
                    console.log(source)
                    if(!source){

                        this.setState({...doc.data(), loading: false})
                    }
                }
                else {
                    this.props.history.push('/menu')
                }
                
        });


    }

    choiceHandler = () => {
        this.setState({buttonLoading: true})
        axios.post('/ships/')
            .then(({data})=>{
                this.setState({choice_data: data, buttonLoading: false})
            })
            .catch((err)=>alert(err))
    }
    
    readyHandler = () => {
        if(_.isEmpty(this.state.choice_data)){
            return this.setState({error: 'You must choice ships.'})
        }
        const data = {
            ['ready_'+ this.user.uid] : true,
            ['data_'+ this.user.uid] : this.state.choice_data
        }

        db.collection('game_rooms').doc(this.room_id).update(data)
        .then(()=>{
            this.setState({...data})
        })
        .catch(err=>alert(err))
    }

    gameEndHandler = () => {
        Promise.all([
            db.collection('game_invitations').doc(this.user.uid).collection('inv_from_uid').doc(this.state[this.user.uid]).delete(),
        
            db.collection('game_invitations').doc(this.state[this.user.uid]).collection('inv_from_uid').doc(this.user.uid).delete()
        ])
        .catch(err=> alert(err))
    }

    hitHandler = (index, name) => {
        const {user, state} = this

        const copy_array = [...state['data_'+state[user.uid]].array]
        const copy_ships = {...state['data_'+state[user.uid]].ships}
        const copy_border = {...state['data_'+state[user.uid]].border}
        let move = null
        let winner = null

        if(copy_array[index].name){
            move = user.uid
            if (copy_ships[name]===1){

                delete copy_ships[name]
                if(_.isEmpty(copy_ships)){
                    this.gameEndHandler()
                    winner = user.uid
                }
                copy_border[name].map(i=>{
                    copy_array[i].border = true
                })
                copy_array[index].hit = true
            }
            else{
                copy_ships[name] = copy_ships[name] -1
                copy_array[index].hit = true

            }
            
        }
        else{
            move = state[user.uid]
            copy_array[index].hit = true
        }
        
        let data = {
            array: copy_array, 
            ships: copy_ships, 
            border: copy_border
        }

        db.collection('game_rooms').doc(this.room_id).update({
            ['data_'+state[user.uid]]: data,
            move,
            winner
        })

        this.setState(prev => ({
                                ...prev, 
                                move,
                                winner,
                                ['data_'+prev[user.uid]]: data
                            })) 
    }

    render() {

        const {loading, buttonLoading, error, move, winner} = this.state
        const {user, state} = this

        const ChoiceRoom = () => (
                        <React.Fragment>
                            <Wrapper margin='0 0 70px 0'>
                                <Typography fontSize='2rem' color='gradient'>
                                    {state['ready_'+ this.user.uid] ? 'Waiting for opponent': "Choice ships positions"}
                                </Typography>
                            </Wrapper>
                            
                            <Board array={state['ready_'+user.uid] ? state['data_'+user.uid].array : state.choice_data.array} show/>
                            
                            <Typography fontSize='1.2rem' color='light' type='span'>
                                {error}
                            </Typography>
                            {!state['ready_'+ this.user.uid] && (
                                <React.Fragment>
                                <Wrapper>
                                    <Button onClick={buttonLoading ? null : this.choiceHandler}>
                                        {buttonLoading ? (   
                                            <PointsProgress size={7}/>
                                        ): (
                                            <Typography fontSize='1.2rem' color='light' type='span'>
                                                Generate 
                                            </Typography>
                                        )}        
                                    </Button>
                                </Wrapper>
                            
                            
                                <Wrapper>
                                    <Button background='button_gradient' onClick={state['ready_'+ this.user.uid] ? null : this.readyHandler}>
                                        <Typography fontSize='1.2rem' color='dark' type='span'>
                                           I'am ready
                                        </Typography>
                                    </Button>
                                </Wrapper>
                                </React.Fragment>
                            )}
                       
                        </React.Fragment>
        )

        const GameRoomComponent = () => (
            <React.Fragment>

                <Wrapper margin='0 0 0px 0'>
                    <Typography fontSize='2rem' color='gradient'>
                        Battle 
                    </Typography>
                </Wrapper>

                <BordersContainer>
                
                    <BorderWrapper margin='60px 70px 30px 70px'>
                        <Board 
                            uid={user.uid}
                            array={state['data_'+state[user.uid]].array } 
                            hit={this.hitHandler} 
                            move={move===state[user.uid]} 
                            mode='opponent' 
                            winner={winner}
                            />
                    </BorderWrapper>

                    <BorderWrapper margin='40px 70px 0 70px'>
                        <Board 
                            uid={user.uid}
                            array={state['data_'+user.uid].array} 
                            move={move===user.uid} 
                            mode='own'
                            winner={winner}
                            />
                    </BorderWrapper>
                
                </BordersContainer>

            </React.Fragment>
        )

        return (
            <Container>
                <MenuButton/>
                {loading ? (
                    <LinearProgress/>
                ):(
                    (this.state['ready_'+user.uid] && state['ready_'+state[this.user.uid]] ) ? (
                        <GameRoomComponent/>
                    ):(
                        <ChoiceRoom/>
                    )
                    
                )}
                
            </Container>
        );
    }
}
const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px 20px;
`;
const Wrapper = styled.div`
    margin: ${({margin})=> margin ? margin : '5px 0'};
`;
const BordersContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;
const BorderWrapper = styled.div`
    margin: ${({margin})=> margin};
    @media(max-width: 640px){
        margin: 60px 20px 0 20px;
    }
`;
export default GameRoom;
