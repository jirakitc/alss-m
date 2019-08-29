const jwt = require('jsonwebtoken');
const db = require('../config/db.config.js');
const classStu = db.classStu;


process.env.SECRET_KEY = 'secret';


exports.enroll_Class = (req, res) => {	
	// Save to MySQL database
	let studata = req.body
        // class_id: req.body.class_id,
        // class_name: req.body.class_name,
		// user_id: req.body.user_id
		
    
	classStu.create(studata).then(result =>{
		res.json(result);
	})
};

exports.getClassStu = (req, res) => {  
	var decoded = jwt.verify(req.headers['auth'], process.env.SECRET_KEY)

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

