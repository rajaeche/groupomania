import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment, editComment } from '../../actions/post.action'
import { UidContext } from '../AppContext'

const EditDeleteComment = ({ comment, postId }) => {
    const [isAuthor, setIsAuthor] = useState(false)
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState('')
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const handleEdit = (e) => {
        e.preventDefault()
        if (text) {
            dispatch(editComment(postId, comment._id, text))
            setText('')
            setEdit(false)
        }
    }

    const handleDelete = () => dispatch(deleteComment(postId, comment._id))

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true)
            }
        }
        checkAuthor()
    }, [uid, comment.commenterId])

    return (
        <div className="edit-comment">
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </span>
            )}
            {isAuthor && edit && (
                <form
                    action=""
                    onSubmit={handleEdit}
                    className="edit-comment-form"
                >
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>
                        Modifier
                    </label>
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text}
                    />
                    <div className="btn">
                        <span
                            onClick={() => {
                                if (
                                    window.confirm(
                                        'Voulez-vous vraiment supprimer ce commentaire?'
                                    )
                                ) {
                                    handleDelete()
                                }
                            }}
                        >
                            <i className="fa-regular fa-trash-can"></i>
                        </span>
                        <input type="submit" value="Valider modifications" />
                    </div>
                </form>
            )}
        </div>
    )
}

export default EditDeleteComment
