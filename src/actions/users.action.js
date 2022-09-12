import axios from 'axios'

// users
export const GET_USERS = 'GET_USERS'
export const GET_USERS_PICTURE = 'GET_USERS_PICTURE'

export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(`http://localhost:5000/api/user/`)
            .then((res) => {
                dispatch({ type: GET_USERS, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const getUsersPicture = () => {
    return (dispatch) => {
        return axios
            .get(`http://localhost:5000/api/user/`)
            .then((res) => {
                console.log('res.data.picture', res.data.picture)
                dispatch({ type: GET_USERS_PICTURE, payload: res.data.picture })
            })
            .catch((err) => console.log(err))
    }
}
