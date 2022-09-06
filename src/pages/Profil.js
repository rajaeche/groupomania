import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import Log from '../components/Log'
import UpadeteProfil from '../components/Profil/updateProfil'
import NewPostForm from '../components/Post/NewPostForm'
import Thread from '../components/Thread'

function Profil() {
    const uid = useContext(UidContext)
    return (
        <div className="profil-page">
            {uid ? (
                <>
                    <UpadeteProfil />
                    <div className="thread-container">
                        <NewPostForm />
                        <Thread posterId />
                    </div>
                </>
            ) : (
                <div className="page-container">
                    <div className="img-container">
                        <img src="./assets/icon-left-font.png" alt="" />
                    </div>
                    <div>
                        <Log login={true} signup={false} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profil
