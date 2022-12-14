import React, { useEffect, useState } from 'react'
import AllRoutes from './components/Routes'
import { UidContext } from './components/AppContext'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getUser } from './actions/user.action'

const App = () => {
    const [uid, setUid] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: 'get',
                url: `http://localhost:5000/jwtid`,
                withCredentials: true,
            })
                .then((res) => {
                    setUid(res.data)
                })
                .catch((err) => console.log('No token', err))
        }
        fetchToken()

        if (uid) dispatch(getUser(uid))
    }, [uid, dispatch])

    return (
        <UidContext.Provider value={uid}>
            <AllRoutes />
        </UidContext.Provider>
    )
}

export default App
