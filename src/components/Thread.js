import React, { useEffect, useState } from 'react'
import { getPosts } from '../actions/post.action'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Post/Card'
import { isEmpty } from './Utils'
// import Profil from '../pages/Profil'
// import ProfileCard from './Post/ProfileCard'

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true)
    const [count, setCount] = useState(5)
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.postReducer)

    const loadMore = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >
            document.scrollingElement.scrollHeight
        ) {
            setLoadPost(true)
        }
    }

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts())
            setLoadPost(false)
            setCount(count + 5)
        }
        window.addEventListener('scroll', loadMore)
        return () => window.removeEventListener('scroll', loadMore)
    }, [loadPost, dispatch, count])

    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return <Card post={post} key={post._id} />
                    })}
            </ul>
        </div>
    )
}

export default Thread
