import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

// log section
const Log = (props) => {
    const [logInModal, setLogInModal] = useState(props.login)
    const [signUpModal, setSignUpModal] = useState(props.signup)

    const handleModals = (e) => {
        if (e.target.id === 'signup') {
            setLogInModal(false)
            setSignUpModal(true)
        } else if (e.target.id === 'login') {
            setSignUpModal(false)
            setLogInModal(true)
        }
    }

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li
                        onClick={handleModals}
                        id="signup"
                        className={signUpModal ? 'active-btn' : null}
                    >
                        S'inscrire
                    </li>
                    <li
                        onClick={handleModals}
                        id="login"
                        className={logInModal ? 'active-btn' : null}
                    >
                        Se connecter
                    </li>
                </ul>
                {signUpModal && <SignupForm />}
                {logInModal && <LoginForm />}
            </div>
        </div>
    )
}

export default Log
