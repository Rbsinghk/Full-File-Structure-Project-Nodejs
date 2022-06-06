const express = require('express');
const verifytoken = require('../middleware/authorise')
const userCtrl = require('../controllers/userController')
const router = new express.Router();

router.post('/userAdd', userCtrl.userAdd)
router.get('/userGet', userCtrl.userGet)
router.post('/uploadImage', userCtrl.uploadImage)
router.post('/login', userCtrl.userLogin)
router.post('/emailCode', userCtrl.emailCode)
router.post('/changePass', userCtrl.changepassword)

router.get('/get',verifytoken,async(req,res)=>{
    try {
        res.send('Hello World')
    } catch (error) {
        res.send('Invalid Role')
    }
})
router.get('/getAdmin',verifytoken,async(req,res)=>{
    try {
        res.send('Hello Admin')
    } catch (error) {
        res.send('Invalid Role')
    }
})

module.exports = router;