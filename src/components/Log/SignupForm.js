import axios from 'axios'
import { useState } from 'react'
import LoginForm from './LoginForm'

function SignupForm() {
    const [formSubmit, setFormSubmit] = useState(false)
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pseudoErr, setPseudoErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [controlPassword, setControlPassword] = useState('')
    const [termsErr, setTermsErr] = useState('')

    const handleSignup = (e) => {
        e.preventDefault()
        const passwordConfirmError = document.querySelector(
            '.password-conf.error'
        )
        const terms = document.getElementById('terms')

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword) {
                passwordConfirmError.innerHTML =
                    'le mot de passe ne correspond pas'
            }
            if (!terms.checked) {
                setTermsErr('Merci de accepter les conditions générales')
            }
        } else {
            axios({
                method: 'post',
                url: `http://localhost:5000/api/user/signup`,
                withCredentials: true,
                data: {
                    pseudo: pseudo,
                    email: email,
                    password: password,
                },
            })
                .then((res) => {
                    if (res.data.errors) {
                        setPseudoErr(
                            'Pseudo non disponible. Merci de choisir un autre pseudo!'
                        )
                        setEmailErr('Merci de saisir un email valide!')
                        setPasswordErr(
                            'Le mot de passe doit contenir 6 caractères ou plus'
                        )
                    } else {
                        setFormSubmit(true)
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <>
            {formSubmit ? (
                <>
                    <LoginForm />
                    <span></span>
                    <h4 className="success">
                        Enregistrement réussi, veuillez-vous connecter
                    </h4>
                </>
            ) : (
                <form action="" onSubmit={handleSignup} id="sign-up-form">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />
                    {pseudoErr && (
                        <div className="pseudo error"> {pseudoErr} </div>
                    )}
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    {emailErr && <div className="email error"> {emailErr}</div>}
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {passwordErr && (
                        <div className="password error"> {passwordErr} </div>
                    )}
                    <label htmlFor="password-conf">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        name="password-conf"
                        id="password-conf"
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={controlPassword}
                    />
                    <div className="password-conf error"></div>
                    <label htmlFor="terms">
                        J'accepte les{' '}
                        <a href="_/" target="_blank" rel="noopener noreferrer">
                            conditions générales
                        </a>
                    </label>
                    <input type="checkbox" id="terms" />
                    {termsErr && <div className="term errors">{termsErr}</div>}
                    <input type="submit" value="Valider l'inscription" />
                </form>
            )}
        </>
    )
}

export default SignupForm
