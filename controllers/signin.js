const handleSignIn = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    
    db.select('email', 'hash').from('login')
        .where(
            'email', '=', email            
        )
        .then(data => {
           const isValidPassword = bcrypt.compareSync(password, data[0].hash);
           if (isValidPassword) {
               return db.select('*').from('users').where('email', '=', email)
                .then(user => {
                    res.json(user[0]);
                })
                .catch(err => res.status(404).json('unable to signin'));
           } else {
               res.status(400).json('wrong user')
           }
        })
        .catch(err => res.status(404).json('wrong user'))
    
}

module.exports = {
    handleSignIn: handleSignIn,
}