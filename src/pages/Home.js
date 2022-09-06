import React, { useContext } from 'react'
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread'
import { UidContext } from '../components/AppContext'
import Profil from './Profil'
import NewPostForm from '../components/Post/NewPostForm'

const Home = () => {
    const uid = useContext(UidContext)
    return (
        <div className="home">
            {uid ? (
                <>
                    <LeftNav />
                    <div className="main">
                        <div className="home-header">
                            <NewPostForm />
                        </div>
                        <Thread />
                    </div>
                </>
            ) : (
                <Profil />
            )}
        </div>
    )
}

export default Home
