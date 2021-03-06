const jwt = require('jsonwebtoken');
const db = require('../config/db.config.js');
const classStu = db.classStu;
const Class = db.class;


process.env.SECRET_KEY = 'secret';


exports.enroll_Class = (req, res) => {	
	// Save to MySQL database
	let studata = {
		class_id: req.body.class_id,
        class_name: req.body.class_name,
		user_id: req.body.user_id,
		teacher_name : req.body.teacher_name,
		class_Subject : req.body.class_Subject
	}
	classStu.findOne({
		where : {
			user_id : studata.user_id,
			class_id : studata.class_id
		}
	}).then(enroll=>{
		if (enroll){
			res.json('ลงทะเบียนวิชานี้ไปแล้ว')
		}else{
			classStu.create(studata).then(result =>{
			res.json('ลงทะเบียนเรียบร้อย')
			})
		}
	})
	
	// classStu.create(studata).then(result =>{
	// 	res.json(result);
	// })
};

exports.getClassStu = (req, res) => {  
	var decoded = jwt.verify(req.headers['classauth'], process.env.SECRET_KEY)

	classStu.findAll({
		where : {
			user_id : decoded.user_id
		}
	})
	.then(data =>res.json(data))
	.catch(err => {
		res.send('error: ' + err)
	  })
}

exports.TCgetclass = (req,res) => {
	var decoded = jwt.verify(req.headers['classauth'], process.env.SECRET_KEY)
	Class.findAll({
	})
	.then(data =>res.json(data))
	.catch(err => {
		res.send('error: ' + err)
	  })
}
