const getImportantData = (req, res, db) => {
    const {id} = req.params;
    db('task')
    .returning('*')
    .where({
        isheartfill: true,
        userid: id
    })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => res.status(404).json('unable get task'));
  }

  module.exports = {getImportantData}