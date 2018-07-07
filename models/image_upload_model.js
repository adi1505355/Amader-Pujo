var mongoose = require('mongoose');


//path and originalname are the fields stored in mongoDB
var imageSchema = mongoose.Schema({
 userID:{
   type: String,
   required: true
 },
 imagePath: {
 type: String,
 required: true,
 trim: true
 },
 originalName: {
 type: String,
 required: true
 },
 fileName: {
 type: String,
 required: true
 },
 imageDetails:{
   type: String,
   required: true
 },
 pandalLocation:{
   type: String,
   required: true
 }

});
const Image  = mongoose.model('image_file', imageSchema);
module.exports=Image;
