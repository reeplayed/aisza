import React, { useEffect, useState } from 'react';
import Board from './Board';
import axios from '../axios'

const ChoiceRoom = ({}) => {

    const [state, setState] = useState('')

    useEffect(()=>{


    },[])
    const Room = () => (
        <div>
            <button onClick={()=>setState('mamma')}>
                Test
            </button>
        </div>
    );

    return [state, Room]
};

export default ChoiceRoom;