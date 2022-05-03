const express = require ('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {Photo} = require('../../db/models')
const db = require('../../db/models')
const {check, validationResult} = require('express-validator')
const {handleValidationErrors} = require('../../utils/validation')
const {requireAuth} = require('../../utils/auth')

const {singleMulterUpload, uploadFile, singlePublicFileUpload} =require('../../aws')

const validatePhoto = [
 check('content')
  .exists({checkFalsy:true})
  .notEmpty()
  .withMessage('Title must contain text')
  .isLength({min:5, max:50})
  .withMessage('Your title must be between 5 and 50 characters long'),
  handleValidationErrors
]

const photoNotFoundError = (id) => {
 const err = Error("Photo not found");
 err.errors = [`Post with id of ${id} could not be found.`];
 err.title = "Photo could not be found.";
 err.status = 404;
 return err
}

router.get('/', asyncHandler(async(req,res) => {
 const photos = await Photo.findAll({include:db.User})
 res.json(photos)
}))

router.get('/:id', asyncHandler(async(req, res, next) => {
const photo = await Photo.findByPk(req.params.id , 
 {include: [{model: db.User}, {model: db.Comment}]})
if (photo) {
 return res.json(photo);
} else {
 next(photoNotFoundError(req.params.id))
}
}))

router.post('/newPhoto', singleMulterUpload('photoUrl'), asyncHandler(async(req, res) => {
  // console.log('hello', req.file)
 const {userId, albumId, content} = req.body
 const photoUrl = await singlePublicFileUpload (req.file)
//  console.log('hello', photoUrl)
 const photo = await Photo.create({userId, albumId, content, photoUrl})
 return res.json(photo)
}))

// router.post('/newPhoto', validatePhoto, asyncHandler(async(req, res) => {
//  const {userId, albumId, content, photoUrl} = req.body
// //  const photoUrl = await uploadFile(req.file)
//  const id = await Photo.create({userId, albumId, content, photoUrl})
//  return res.json(id)
// }))

router.put('/:id', validatePhoto, asyncHandler(async(req,res) => {
  console.log('tester', req.params.id)
const parsedPhotoId = parseInt(req.params.id, 10)
const {userId, albumId, content} = req.body;
const photo = await Photo.findByPk(parsedPhotoId, {include: db.User})
const newPhoto = await photo.update({userId, albumId, content})
return res.json(newPhoto)
}))

router.delete('/:id', asyncHandler(async(req, res) => {
 const parsedPhotoId = parseInt(req.params.id)
 const photo = await Photo.findByPk(parsedPhotoId);

 if(photo) {
  await photo.destroy();
  return res.json(photo)
 } else {
  next(photoNotFoundError(req.params.id))
 }
}))

module.exports = router