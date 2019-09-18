var express = require('express');
var _router = express.Router();
var multer = require('multer');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './contents');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

var upload = multer({storage:store}).single('file');

_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});

module.exports = _router;