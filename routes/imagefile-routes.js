var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var path=require('path');
var image=require('../models/image_upload_model');
//path and originalname are the fields stored in mongoDB


router.getImages = function(callback, limit) {

 image.find(callback).limit(limit);
}


router.getImageById = function(id, callback) {

 image.findById(id, callback);

}




// To set the storage engine
var storage = multer.diskStorage({
 destination: './uploads',
 filename: function(req, file, cb) {//cb stands for callback
 cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
 }
});

var upload = multer({
 storage: storage,//says for storage we want to use the engine we defined above
 limits:{fileSize:1000000},//limit size as 1mb
 fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myimage');




// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}






router.post('/', (req, res) => {
  router.getImages(function(err,genres){
    if(err){
      throw err;
    }
  upload(req, res, (err) => {
    if(err){
      res.render('profile', {
        data:req.user,msg: err,genres:genres
      });
    } else {

      if(req.file == undefined){
        res.render('profile', {
          data:req.user,
          msg: 'Error: No File Selected!',
          genres:genres
        });
      } else {

        console.log(req.user);
        console.log(req.file);
        console.log(req.body);
        new image({
                      userID:req.user.id,
                      imagePath: req.file.path,
                      originalName:req.file.originalname,
                      fileName: req.file.filename,
                      imageDetails:req.body.imageInfo,
                      pandalLocation:req.body.pandalInfo
                  }).save();
                    res.render('profile', {
                    data:req.user,
                    msg: 'File Uploaded!',
                    genres:genres
                  });

      }
    }
  });
  });
});


module.exports = router;
