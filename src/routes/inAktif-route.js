const route = require('express').Router()
const {Get_inaktif,Post_data,Get_AllData,Get_test,Get_inaktif_kode} = require('../controllers/inAktif-controller')

route.get('/', Get_inaktif)
route.get('/:kode', Get_inaktif_kode)
route.post('/post',Post_data)
route.get('/list', Get_AllData)
route.get('/test',Get_test)

module.exports = route