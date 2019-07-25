const db = require('../config/db.config.js');
const classStu = db.classStu;

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
	classStu.findOne({
		where : {
			class_id : studata.class_id,
			user_id : studata.user_id
		},
		limit: 1
	}).then(class_id =>{
		if (class_id >= 1){
			res.json('username already exists')
		} else {
			classStu.create(studata).then(result =>{
				res.json(result);
			})

		}	
	})
};