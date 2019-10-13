const db = require('../config/db.config.js');
const Room = db.class;
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })


const jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'secret';

exports.create_Class = (req,res) =>{
	let class_Data = {
		class_name : req.body.class_name,
		class_id : req.body.class_id,
		class_Subject : req.body.class_Subject,
		teacher_name : req.body.teacher_name,
		total_student : req.body.total_student
	}
	if(class_Data.class_name === ''){
		res.json('โปรดกรอกชื่อวิชา');
	} else {
		Room.create(class_Data).then(result => {		
			res.json('สร้างห้องเรียนเรียบร้อย');	
			})
	}
		
	
}

exports.getClass = (req, res) => {
	// var decoded = jwt.verify(req.headers['classauth'], process.env.SECRET_KEY)

	Room.findAll({
	})
	.then(result => {
	  res.json(result);
	});
};

exports.getEnrollClass = (req,res) => {
	var decoded = jwt.verify(req.headers['classauth'], process.env.SECRET_KEY)

	Room.findAll({
		where : {
			user_id : decoded.user_id
		}
	})
	.then(result => {
		res.json(result);
	})
}

exports.getMaxID = (req,res) =>{
	Room.max('class_id')
	.then(max =>{
		res.json(max)
	})
}

exports.getClassID = (req, res) => {  
	Room.findAll({
		where : {
			class_id : req.params.classId
		}
	})
	.then(data =>res.json(data))
}