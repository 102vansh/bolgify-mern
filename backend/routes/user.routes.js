const express = require('express')
const { registeruser, login, logout, getmyprofile, allusers, singleuser, updatepassword, updateprofile, allauthor } = require('../controllers/user.controller')
const {isauth} = require('../middleware/isauth')
const router = express.Router()


router.route('/register').post(registeruser)
router.route('/login').post(login)
router.route('/logout').get(isauth,logout)
router.route('/myprofile').get(isauth,getmyprofile)
router.route('/alluser').get(isauth,allusers)
router.route('/singleuser/:id').get(isauth,singleuser)
router.route('/updatepassword').put(isauth,updatepassword)
router.route('/updateprofile').put(isauth,updateprofile)
router.route('/allauthor').get(allauthor)
module.exports = router