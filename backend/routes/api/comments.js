const express = require ('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {Comment} = require('../../db/models')
const db = require('../../db/models')
const {check, validationResult} = require('express-validator')
const {handleValidationErrors} = require('../../utils/validation')
const {requireAuth} = require('../../utils/auth')

router.get


module.exports = router