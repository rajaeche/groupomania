import { GET_USERS } from '../actions/users.action'

const initialState = {}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return action.payload
        // case GET_USERS_PICTURE:
        //     return action.payload
        default:
            return state
    }
}
