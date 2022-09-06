import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import Discovery from '../../pages/Discovery'
import NavBar from '../NavBar'

const AllRoutes = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/discovery" element={<Discovery />} />
            </Routes>
        </Router>
    )
}

export default AllRoutes
