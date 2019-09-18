const db = require('../config/db.config.js');
const conTent = db.conTent;

exports.uploadConTent = (req,res) =>{
	let class_Data = req.body

	conTent.create(class_Data).then(result => {		
		res.json(result);
	});
}

exports.getClassId = (req,res) =>{
    conTent.findById(req.params.classId).then(classId => {
		res.json(classId);
	})
}

exports.getContentData = (req,res) =>{
    conTent.findAll({
        where : {
            class_id : req.params.classId
        }
	})
	.then(result => {
	  res.json(result);
    });
}