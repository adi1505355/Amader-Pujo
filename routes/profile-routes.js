const router=require('express').Router();
const bodyParser=require('body-parser');
const path=require('path');
const img_route=require('./imagefile-routes')
const express=require('express');
const app=express();
app.use(express.static('../uploads'));

//using middlewares
router.use(bodyParser.json());

//using image middlweware
router.use('/',img_route);


const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/');
    } else {
        next();
    }
};


router.get('/',authCheck,(req,res)=>{
  img_route.getImages(function(err,genres){
    if(err){
      throw err;
    }
    console.log("here1");
    console.log(genres);
    console.log(req.user);
    res.render('profile',{data:req.user,genres:genres});
  });
});



module.exports=router;
