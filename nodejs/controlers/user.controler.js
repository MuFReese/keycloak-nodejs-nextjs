const db = require('../db')

class UserControler {
  // async createUser(req, res) {
  //   const {name, surname} = req.body
  //   const newPerson = await db.query(`INSERT INTO persontest (name, surname) values ($1, $2) RETURNING *`, [name, surname])

  //   res.json(newPerson)
  // }
  
  async getUsers(req, res) {
    const users = await db.query(`SELECT * FROM user_entity`)
    res.json(users.rows)
  }

  async getUsersAtribut(req, res) {
    const users = await db.query(`SELECT * FROM user_attribute`)
    res.json(users.rows)
  }

  async getOneUser(req, res) {
    const id = req.params.id
    const user = await db.query(`SELECT * FROM user_attribute where user_id = $1`, [id])
    res.json(user.rows)
  }

  async updateUser(req, res) {
    const {id, value} = req.body
    const user = await db.query(`UPDATE user_attribute set value = $1 where id = $2 RETURNING *`, [value, id])
    res.json(user.rows[0])
  }

  // async delateUser(req, res) {
  //   const id = req.params.id
  //   const user = await db.query(`DELETE FROM persontest where id = $1`, [id])
  //   res.json(user.rows[0])
  // }
}

module.exports = new UserControler()