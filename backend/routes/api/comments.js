const express = require ('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {Comment} = require('../../db/models')
const db = require('../../db/models')
const {check, validationResult} = require('express-validator')
const {handleValidationErrors} = require('../../utils/validation')
const {requireAuth} = require('../../utils/auth')


const validateComment = [
 check('content')
  .exists({checkFalsy:true})
  .notEmpty()
  .withMessage('Comment can not be empty')
  .isLength({min:5, max:250})
  .withMessage('Your title must be between 5 and 250 characters long'),
  handleValidationErrors
]

const photoNotFoundError = (id) => {
 const err = Error("Photo not found");
 err.errors = [`Post with id of ${id} could not be found.`];
 err.title = "Photo could not be found.";
 err.status = 404;
 return err
}

router.get('/', asyncHandler(async(req, res) => {
 const comments = await db.Comment.findAll({include:db.User}, {include:db.Photo})
 res.json(comments)
}))

router.post('/', requireAuth, asyncHandler(async(req,res) =>{ 
const {userId, photoId, comment,} =req.body
const newComment = await db.Comment.create({userId, photoId, comment},{
 include: db.User})
 return res.json(newComment)
}))

router.put('/:id',  asyncHandler(async(req,res) => {
  const {userId, photoId, comment,} =req.body
 const id = parseInt(req.params.id,10);
 const findComment = await db.Comment.findByPk(id)
 const updatedComment = await findComment.update({userId, photoId, comment})
 return res.json(updatedComment)
}))

router.delete("/:id", requireAuth, asyncHandler(async(req,res) => {
 const id = parseInt(req.params.id)
 const comment = await db.Comment.findByPk(id)

 if(comment) {
  await comment.destroy()
  return res.json(comment)
 } else {
  next(photoNotFoundError(req.params.id))
 }
}))


module.exports = router