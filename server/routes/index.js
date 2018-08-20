const router = require('express').Router()
const {register, login, addItem, searchByName, searchByPrice, search} = require('../constrollers/index');

router.post('/register',register)
      .post('/request_token',login)
      .post('/items/:token',addItem)
      .get('/name=:name',searchByName)
      .get('/price_start=:price',searchByPrice)
      .get('/',search)

module.exports = router
