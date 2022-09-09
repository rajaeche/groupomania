import React, { useContext } from 'react'
import UsersCard from '../components/Discovery/UsersCard'
import { useSelector } from 'react-redux/es/exports'
import { UidContext } from '../components/AppContext'
import LeftNav from '../components/LeftNav'
import Profil from './Profil'

function Discovery() {
    const usersData = useSelector((state) => state.usersReducer)
    const uid = useContext(UidContext)
    return (
        <div className="discovery">
            {uid ? (
                <>
                    <LeftNav />
                    <div className="discovery-container">
                        <h1>Les utilisateurs de Groupomania</h1>
                        <ul>
                            {usersData.map((user) => {
                                return <UsersCard user={user} key={user._id} />
                            })}
                        </ul>
                    </div>
                </>
            ) : (
                <Profil />
            )}
        </div>
    )
}

export default Discovery
