import { GET_MESSAGE, CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILURE, JOIN_ROOM_REQUEST, JOIN_ROOM_SUCCESS, JOIN_ROOM_FAILURE, SET_USERNAME } from "./actions";

const INITIAL_STATE = {
    room: null,
    user: {
        name: "",
        id: ""
    },
    loading: false,
    error: null,
};

const chatReducer = (state = INITIAL_STATE, actions ) => {
    switch(actions.type) {
        case(CREATE_ROOM_REQUEST): {
            return {
                ...state,
                loading: true
            };
        }
        case(CREATE_ROOM_SUCCESS): {
            return {
                ...state,
                loading: false,
                room: actions.payload.room
            };
        }
        case(CREATE_ROOM_FAILURE): {
            return {
                ...state,
                loading: false,
                error: actions.error
            }
        }
        case(JOIN_ROOM_REQUEST): {
            return {
                ...state,
                loading: true
            }
        }
        case(JOIN_ROOM_SUCCESS): {
            return {
                ...state,
                loading: false,
                room: actions.payload.room,
            }
        }
        case(JOIN_ROOM_FAILURE): {
            return {
                ...state,
                loading: false,
                error: actions.error
            }
        }
        case(SET_USERNAME): {
            return {
                ...state,
                user: actions.payload
            }
        }
        case(GET_MESSAGE): {
            const room = {...state.room};
            room.chatLog.push(actions.payload.message)
            return {
                ...state,
                room
            }
        }
        default: return state;
    }
}

export default chatReducer;