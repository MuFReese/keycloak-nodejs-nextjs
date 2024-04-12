const Router = require('express')
const router = new Router()
const userController = require('../controlers/user.controler')


// router.post('/user', userController.createUser)
router.get('/user', userController.getUsers)
router.get('/usersAtribut', userController.getUsersAtribut)
router.get('/user/:id', userController.getOneUser)
router.post('/telefon', userController.updateUser) //не только для телефона
// router.delete('/user/:id', userController.delateUser)

module.exports = router