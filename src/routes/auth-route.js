const route = require('express').Router()
const {Get_auth,Get_signup,Post_signup,Get_login,Post_login,Log_Out} = require('../controllers/auth-controller')

// route('/signup')
route.get('/', Get_auth)
route.get('/signup', Get_signup)
route.post('/signup', Post_signup)
// route.get('/login', Get_login)
route.post('/login', Post_login)
route.get('/logout', Log_Out)


module.exports = route