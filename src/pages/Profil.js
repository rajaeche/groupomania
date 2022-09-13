import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import { useSelector } from 'react-redux'
import Log from '../components/Log'
import UpadeteProfil from '../components/Profil/updateProfil'
import NewPostForm from '../components/Post/NewPostForm'
import Card from '../components/Post/Card'
import LeftNav from '../components/LeftNav'
import { isEmpty } from '../components/Utils'

const Profil = ({ profile }) => {
    const uid = useContext(UidContext)
    const posts = useSelector((state) => state.postReducer)
    const userData = useSelector((state) => state.userReducer)
    return (
        <section>
            {uid ? (
                <>
                    <h1>Profil de {userData.pseudo}</h1>
                    <div className="profil-page">
                        <LeftNav />
                        <UpadeteProfil />
                        <article></article>
                        <article className="profil-post">
                            <NewPostForm />
                            <div className="thread-container">
                                <ul>
                                    {!isEmpty(posts[0]) &&
                                        posts.map((post) => {
                                            if (userData._id === post.posterId)
                                                return (
                                                    <Card
                                                        post={post}
                                                        key={post._id}
                                                    />
                                                )
                                            else return null
                                        })}
                                </ul>
                            </div>
                        </article>
                    </div>
                </>
            ) : (
                <div className="log-container">
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
