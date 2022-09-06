import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNav = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to="/" id="home">
                        <img src="/assets/home.svg" alt="home" />
                    </NavLink>
                    <NavLink to="/profil" id="profil">
                        <img src="/assets/user.svg" alt="user" />
                    </NavLink>
                    <NavLink to="/discovery" id="discovery">
                        <img src="/assets/rocket.svg" alt="rocket" />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftNav
