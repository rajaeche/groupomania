module.exports.signupErrors = (err) => {
    const errors = { pseudo: '', email: ''};
    if (err.code === 11000)
        errors.email = 'email already taken';
    if (err.code === 11000)
        errors.pseudo = 'pseudo already taken';
    return errors;
}