const db = require('../config/db.config.js');
const Room = db.class;

exports.create_Class = (req,res) =>{
	let class_Data = {
        class_name: req.body.class_name,
        class_Subject: req.body.subject_Name,
        teacher_name: req.body.teacher_name,
        total_student: req.body.total_student
    }
	Room.create(class_Data).then(result => {		
		// Send created customer to client
		res.json(result);
	});
}

exports.getClass = (req, res) => {
	Room.findAll()
	.then(result => {
	  res.json(result);
	});
};