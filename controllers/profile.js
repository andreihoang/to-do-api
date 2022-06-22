const handleProfileGet = (db) => (req, res) => {
    const {id} = req.params;
 
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            return res.json(user[0]);
        } else {
            return res.status(400).json('Not Found!')
        }
    })
      .catch(err => res.status(400).json('Not Found!'))
}

module.exports = {
    handleProfileGet: handleProfileGet
}