import axios from 'axios';
import uuid from 'uuid-v4';

const API_BASE = "http://localhost:3040";

export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_FAILURE = "CREATE_ROOM_FAILURE";

export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST";
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const JOIN_ROOM_FAILURE = "JOIN_ROOM_FAILURE";

export const SET_USERNAME = "SET_USERNAME"

export const createRoomRequest = () => {
    return {
        type: CREATE_ROOM_REQUEST
    }
};

export const createRoomSuccess = payload => {
    return {
        type: CREATE_ROOM_SUCCESS,
        payload
    }
};

export const createRoomFailure = error => {
    return {
        type: CREATE_ROOM_FAILURE,
        error
    }
};

export const createRoom = (roomName, username) => {
    return async (dispatch) => {
        dispatch(createRoomRequest());
        const user = {
            id: uuid(),
            name: username,
            admin: true
        }
        axios.post(`${API_BASE}/rooms?name=${roomName}`, user)
            .then(response => {
                dispatch(createRoomSuccess(response.data));
            })
            .catch(err => {
                dispatch(createRoomFailure(err))
            });
    }
};

export const joinRoomRequest = () => {
    return {
        type: JOIN_ROOM_REQUEST
    }
};

export const joinRoomSuccess = payload => {
    return {
        type: JOIN_ROOM_SUCCESS,
        payload
    }
};

export const joinRoomFailure = error => {
    return {
        type: JOIN_ROOM_FAILURE,
        error
    }
};

export const joinRoom = (roomId, username) => {
    return async (dispatch) => {
        console.log('username:', username)
        dispatch(joinRoomRequest());
        const user = {
            id: uuid(),
            name: username,
            admin: false
        }
        axios.post(`${API_BASE}/room/${roomId}`, user)
            .then(response => {
                dispatch(joinRoomSuccess(response.data));
            })
            .catch(err => {
                dispatch(joinRoomFailure(err))
            });
    }
}

export function setUsername(username){
    return {
        type: SET_USERNAME,
        username
    }
}