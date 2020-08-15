const selectDados = (req, res, db) => {

    db.select('*')
        .from('solicitacao')
        .orderBy('data', 'asc')
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

    console.log('eee');
    const { solicitante, solicitacao, data, status } = req.body
    const data_gravacao = new Date()
    db('solicitacao')
        .insert({ solicitante, solicitacao, data, status })
        .returning('*')
        .then((item) => {
            res.json(item)
        })
        .catch((err) => res.status(400).json({ dbError: 'db error' }))
}

const updateDados = (req, res, db) => {
    const { solicitante, solicitacao, data, status } = req.body
    db('solicitacao')
        .where({ id })
        .update({  solicitante, solicitacao, data, status })
        .returning('*')
        .then((item) => {
            res.json(item)
        })
        .catch((err) => res.status(400).json({ dbError: 'db error' }))
}

const deleteDados = (req, res, db) => {
    const { id } = req.body
    db('solicitacao')
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
