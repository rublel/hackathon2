const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bank',
    password: 'root',
    port: 5432,
})

const getUsers = (req, res) => {
    pool.query('SELECT * FROM customers', (error, results) => {
        if (error) {
            res.render('pages/error', { error: error })
        }
        res.render('pages/index', { data: results.rows })
    })
}

const getUserByQuery = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(`SELECT * FROM customers WHERE id = $1`, [id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length > 0) {
            res.render('partials/table', { data: results.rows })
        } else {
            res.render('pages/error', { error: 'Correspondance error: No customer with this ID' })
        }
    })
}

const getInfoById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM customers WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.render('pages/info', { data: results.rows })
    })
}

const getUserByPage = (req, res) => {
    const page = parseInt(req.params.page)
    pool.query(`SELECT COUNT(id) as total FROM customers`, (error, results) => {
        if (error) {
            throw error
        }
        pool.query(`SELECT * FROM customers LIMIT ${page}`, (err, response) => {
            if (err) {
                throw err
            }
            res.render('pages/index', { data: response.rows })
        })
    })
}


const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM customers WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Customer deleted with ID: <b>#${id}</b>`)
    })
}



module.exports = {
    getUsers,
    getUserByQuery,
    getUserByPage,
    deleteUser,
    getInfoById
}