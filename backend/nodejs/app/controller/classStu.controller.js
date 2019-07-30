const jwt = require('jsonwebtoken');
const db = require('../config/db.config.js');
const classStu = db.classStu;

process.env.SECRET_KEY = 'secret';

exports.enroll_ClassX = (req,res) =>{
	let class_Data = {
        class_id: req.body.class_id,
        class_name: req.body.class_name,
        user_id: req.body.user_id
    }
	classStu.create(class_Data).then(result => {		
		res.json(result);
	});
}

exports.enroll_ClassY = (req, res) => {	
	// Save to MySQL database
	let studata = {
        class_id: req.body.class_id,
        class_name: req.body.class_name,
        user_id: req.body.user_id
    }
	classStu.create(studata).then(result => {		
		// Send created customer to client
		res.json(result);
	});
};

exports.enroll_Class = (req, res) => {	
	// Save to MySQL database
	let studata = {
        class_id: req.body.class_id,
        class_name: req.body.class_name,
        user_id: req.body.user_id
    }
	classStu.create(studata).then(result =>{
		res.json(result);
	})
};

exports.getClassStu = (req, res) => {


	classStu.findAll({
		where : {
			user_id : '100007'
		}
	})
	.then(data =>res.json(data))
}