import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports'
import Logout from './Log/Logout'
import { UidContext } from './AppContext'

const NavBar = () => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/">
                        <div className="logo">
                            <img
                                src="./assets/icon-left-font-monochrome-black.png"
                                alt=""
                            />
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li className="welcome">
                            <NavLink to="/profil">
                                {userData.admin ? (
                                    <>
                                        <h5>Mode Administrateur </h5>
                                        <img
                                            src={userData.picture}
                                            alt="user-pic"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <h5>Bienvenue </h5>
                                        <img
                                            src={userData.picture}
                                            alt="user-pic"
                                        />
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink to="/profil">
                                <img src="./assets/login.svg" alt="login" />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default NavBar
