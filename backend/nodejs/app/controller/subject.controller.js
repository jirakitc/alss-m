const db = require('../config/db.config.js');
const Subject = db.subject;

exports.create_Subject = (req,res) =>{
	let subject_Data = req.body
	Subject.create(subject_Data).then(subject_data => {		
		// Send created customer to client
		res.json(subject_data);
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