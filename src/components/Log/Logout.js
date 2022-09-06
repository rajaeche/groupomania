import React from 'react'
import axios from 'axios'
import cookie from 'js-cookie'

function Logout() {
    const removeCookie = (key) => {
        if (window !== undefined) {
            cookie.remove(key, { expires: 1 })
        }
    }
    const logout = async () => {
        await axios({
            method: 'get',
            url: `http://localhost:5000/api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err))
        window.location = '/profil'
    }
    return (
        <li onClick={logout}>
            <img src="./assets/logout.svg" alt="logout" />
        </li>
    )
}

export default Logout
