import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/exports'
import { isEmpty } from '../Utils'

// users cards
const UsersCard = ({ user }) => {
    const [isLoading, setIsLoading] = useState(true)
    const usersData = useSelector((state) => state.usersReducer)

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    return (
        <li className="card-container-discovery" key={user._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        <img src={user.picture} alt="user-pic" />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h5> {user.pseudo}</h5>
                            </div>
                            <span className="bio">{user.bio}</span>
                        </div>
                    </div>
                </>
            )}
        </li>
    )
}

export default UsersCard
