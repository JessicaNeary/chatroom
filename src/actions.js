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

export const GET_MESSAGE = "GET_MESSAGE";
export const SEND_MESSAGE = "SEND_MESSAGE";

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

export const createRoom = (roomName, user) => {
    return async (dispatch) => {
        dispatch(createRoomRequest());
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

export function setUsername(username){
    return {
        type: SET_USERNAME,
        payload: {
            name: username,
            id: uuid()
        }
    }
}

export function getMessage({ roomId, message }) {
    return {
        type: GET_MESSAGE,
        payload: {
            roomId,
            message
        }
    }
}

export function sendMessage(roomId, message) {
    return {
        type: SEND_MESSAGE,
        payload: {
            roomId,
            message
        }
    }
}