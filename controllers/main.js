const selectDados = (req, res, db) => {

    db.select('*')
        .from('teste')
        .then((items) => {
            if (items.length) {
                res.json(items)
            } else {
                res.json({ dataExists: 'false' })
            }
        })
        .catch((err) => res.status(400).json({ dbError: 'db error' }))
}

const insertDados = (req, res, db) => {
    const { first, last, email, phone, location, hobby } = req.body
    const added = new Date()
    db('teste')
        .insert({ first, last, email, phone, location, hobby, added })
        .returning('*')
        .then((item) => {
            res.json(item)
        })
        .catch((err) => res.status(400).json({ dbError: 'db error' }))
}

const updateDados = (req, res, db) => {
    const { id, first, last, email, phone, location, hobby } = req.body
    db('teste')
        .where({ id })
        .update({ first, last, email, phone, location, hobby })
        .returning('*')
        .then((item) => {
            res.json(item)
        })
        .catch((err) => res.status(400).json({ dbError: 'db error' }))
}

const deleteDados = (req, res, db) => {
    const { id } = req.body
    db('teste')
        .where({ id })
        .del()
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch((err) => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
    selectDados,
    insertDados,
    updateDados,
    deleteDados,
}
