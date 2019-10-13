const db = require('../config/db.config.js');
const Subject = db.subject;

exports.create_Subject = (req,res) =>{
	let subject_Data = {
		subject_Name : req.body.subject_Name,
		subject_id : req.body.subject_id,
		subject_Description : req.body.subject_Description
	}

	if(subject_Data.subject_Name === ''){
		res.json('โปรดกรอกชื่อวิชา');
	} else 
		Subject.create(subject_Data).then(subject_data => {		
		res.json('สร้างวิชาเรียบร้อย');
		});
}

exports.show_Subject = (req,res) =>{
	Subject.findAll()
	.then(result =>{
		res.json(result);
	})
}

exports.get_SubjectID = (req,res) =>{
	Subject.max('subject_id')
	.then(max =>{
		res.json(max)
	})
}