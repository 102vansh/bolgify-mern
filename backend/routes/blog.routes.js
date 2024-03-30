const express = require('express')
const { createblog, getallblogs, deletelblogs, myblog, singleblog, updateblog } = require('../controllers/blog.controller')
const {isauth, isAuthorized} = require('../middleware/isauth')
const router = express.Router()

router.route('/createblog').post( isauth,isAuthorized('Author'),createblog)
router.route('/getallblogs').get(isauth,getallblogs)
router.route('/deleteblog').delete(isauth,isAuthorized('Author'),deletelblogs)
router.route('/myblogs').get(isauth,isAuthorized('Author'),myblog)
router.route('/singleblog/:id').get(isauth,singleblog)
router.route('/updateblog/:id').put(isauth,isAuthorized('Author'),updateblog)
module.exports = router