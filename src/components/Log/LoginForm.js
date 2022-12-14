import axios from 'axios'
import { useState } from 'react'

// login form
function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: `http://localhost:5000/api/user/login`,
            withCredentials: true,
            data: {
                email: email,
                password: password,
            },
        })
            .then((res) => {
                if (res.data.errors) {
                    setEmailErr(res.data.errors.email)
                    setPasswordErr(res.data.errors.password)
                } else {
                    console.log('else')
                    window.location = '/'
                }
            })
            .catch((err) => {
                console.log('error catch', err)
            })
    }

    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            {emailErr && <div className="email error">{emailErr}</div>}
            <label htmlFor="password">Mot de passe</label>
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            {passwordErr && <div className="password error">{passwordErr}</div>}

            <input type="submit" value="se connecter" />
        </form>
    )
}

export default LoginForm
