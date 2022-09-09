import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { dateParser, isEmpty } from '../Utils'
import { updatePost } from '../../actions/post.action'
import LikeButton from './LikeButton'
import CardComments from './CardComments'
import DeleteCard from './DeleteCard'

const ProfileCard = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdated, setIsUpdated] = useState(false)
    const [textUpdate, setTextUpdate] = useState(null)
    const [showComments, setShowComments] = useState(false)
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false)
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    if (post.posterId === userData._id) {
        return (
            <>
                <li className="card-container" key={post.posterId}>
                    {isLoading ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        <>
                            <div className="card-left">
                                <img
                                    src={
                                        !isEmpty(usersData[0]) &&
                                        usersData
                                            .map((user) => {
                                                if (user._id === post.posterId)
                                                    return user.picture
                                                else return null
                                            })
                                            .join('')
                                    }
                                    alt="poster-pic"
                                />
                            </div>
                            <div className="card-right">
                                <div className="card-header">
                                    <div className="pseudo">
                                        <h3>
                                            {!isEmpty(usersData[0]) &&
                                                usersData
                                                    .map((user) => {
                                                        if (
                                                            user._id ===
                                                            post.posterId
                                                        )
                                                            return user.pseudo
                                                        else return null
                                                    })
                                                    .join('')}
                                        </h3>
                                    </div>
                                    <span>{dateParser(post.createdAt)}</span>
                                </div>
                                {isUpdated === false && <p>{post.message}</p>}
                                {isUpdated && (
                                    <div className="update-post">
                                        <textarea
                                            defaultValue={post.message}
                                            onChange={(e) =>
                                                setTextUpdate(e.target.value)
                                            }
                                        />
                                        <div className="button-container">
                                            <button
                                                className="btn"
                                                onClick={updateItem}
                                            >
                                                Valider modifications
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {post.picture && (
                                    <img
                                        src={post.picture}
                                        alt="card-pic"
                                        className="card-pic"
                                    />
                                )}
                                {post.video && (
                                    <iframe
                                        width="500"
                                        height="300"
                                        src={post.video}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={post._id}
                                    ></iframe>
                                )}
                                {userData.admin ? (
                                    <div className="button-container">
                                        <div
                                            onClick={() =>
                                                setIsUpdated(!isUpdated)
                                            }
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </div>
                                        <DeleteCard id={post._id} />
                                    </div>
                                ) : (
                                    userData._id === post.posterId && (
                                        <>
                                            <div className="button-container">
                                                <div
                                                    onClick={() =>
                                                        setIsUpdated(!isUpdated)
                                                    }
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </div>
                                                <DeleteCard id={post._id} />
                                            </div>
                                        </>
                                    )
                                )}
                                <div className="card-footer">
                                    <div className="comment-icon">
                                        <div
                                            onClick={() =>
                                                setShowComments(!showComments)
                                            }
                                        >
                                            {/* à remplacer plus tard */}
                                            <i className="fas fa-regular fa-comment-lines">
                                                💬
                                            </i>
                                        </div>
                                        <span>{post.comments.length}</span>
                                    </div>
                                    <LikeButton post={post} />
                                </div>
                                {showComments && <CardComments post={post} />}
                            </div>
                        </>
                    )}
                </li>
            </>
        )
    }
}

export default ProfileCard
