const selectDadosSolicitacao = (req, res, db) => {
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

const insertDadosSolicitacao = (req, res, db) => {

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

const updateDadosSolicitacao = (req, res, db) => {
    const { id_solicitacao, solicitante, solicitacao, data, status } = req.body
    db('solicitacao')
        .where({ id_solicitacao })
        .update({  solicitante, solicitacao, data, status })
        .returning('*')
        .then((item) => {
            res.json(item)
        })
        .catch((err) => res.status(400).json({ dbError: 'db error' }))
}

const deleteDadosSolicitacao = (req, res, db) => {
    const { id_solicitacao } = req.body
    db('solicitacao')
        .where({ id_solicitacao })
        .del()
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch((err) => res.status(400).json({ dbError: 'db error' }))
}

const selectDadosAndamento = (req, res, db) => {
    const { id_solicitacao } = req.body
   // console.log('maind=' + id_solicitacao)
    db('andamento')
        .where('id_solicitacao', 1)
        //.orderBy('data', 'asc')
        .then((items) => {
            if (items.length) {
                res.json(items)
            } else {
                res.json({ dataExists: 'false' })
            }
        })
        .catch((err) => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
    selectDadosSolicitacao,
    insertDadosSolicitacao,
    updateDadosSolicitacao,
    deleteDadosSolicitacao,
    selectDadosAndamento,
}
