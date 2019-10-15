const db = require('../config/db.config.js');
const conTent = db.conTent;

exports.uploadConTent = (req,res) =>{
	let content_data = {
		class_id : req.body.class_id,
		content_name : req.body.content_name,
		content_address : req.body.content_address
	}
	var _content_address = content_data.content_address;
	var address = _content_address.split("C:\\fakepath\\")
	
	let content_data_r = {
		class_id : req.body.class_id,
		content_name : req.body.content_name,
		content_address : address[1]
	}

	console.log(address[1])
	conTent.create(content_data_r).then(result => {		
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

exports.getAddress = (req,res) =>{
	let _content_name = req.body.content_name	

	conTent.findAll({
		where : {
			content_name : _content_name
		} ,	attributes: ['content_address']
	}).then(result =>{
		res.json(result)
	})

}