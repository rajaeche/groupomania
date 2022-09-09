import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import Log from '../components/Log'
import UpadeteProfil from '../components/Profil/updateProfil'
import NewPostForm from '../components/Post/NewPostForm'
import Thread from '../components/Thread'

function Profil() {
    const uid = useContext(UidContext)
    return (
        <section className="profil-page">
            {uid ? (
                <>
                    <UpadeteProfil />
                    <article className="profil-post">
                        <NewPostForm />
                        <Thread />
                    </article>
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
        </section>
    )
}

export default Profil
