const express = require('express');
const auth = require('../middleware/authorise')
const userCtrl = require('../controllers/userController')
const router = new express.Router();

router.post('/userAdd', userCtrl.userAdd)
router.get('/userGet', userCtrl.userGet)
router.post('/uploadImage', userCtrl.uploadImage)
router.post('/login', userCtrl.userLogin)
router.post('/emailCode', userCtrl.emailCode)
router.post('/changePass', userCtrl.changepassword)

router.get('/',auth,async(req,res)=>{
    try {
        res.send('Hello World')
    } catch (error) {
        res.send('Invalid Role')
    }
})

module.exports = router;