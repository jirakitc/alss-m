const db = require('../config/db.config.js');
const Subject = db.subject;

exports.create_Subject = (req,res) =>{
	let subject_Data = {
		subject_id: req.body.subject_id,
        subject_Name: req.body.subject_Name,
        subject_Description: req.body.subject_Description
    }
	Subject.create(subject_Data).then(result => {		
		// Send created customer to client
		res.json(result);
	});
}

exports.show_Subject = (req,res) =>{
	Subject.findAll()
	.then(result =>{
		res.json(result);
	})
}