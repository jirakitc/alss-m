const jwt = require('jsonwebtoken')
const db = require('../config/db.config.js');
const Customer = db.customers;


process.env.SECRET_KEY = 'secret'

// Post a Customer
exports.create = (req, res) => {	
	// Save to MySQL database
	let customer = req.body
	Customer.findOne({
		where : {
			username : req.body.username
		}
	}).then(user =>{
		if (user != null){
			res.json('username already exists')
		} else {
			Customer.create(customer).then(result => {		
				// Send created customer to client
				res.json(result);
			});
		}
	})
};
 
// Fetch all Customers
exports.findAll = (req, res) => {
	Customer.findAll().then(customers => {
	  // Send all customers to Client
	  res.json(customers);
	});
};

// Find a Customer by Id
exports.findById = (req, res) => {	
	Customer.findById(req.params.customerId).then(customer => {
		res.json(customer);
	})
};
 
// Update a Customer
exports.update = (req, res) => {
	let customer = req.body;
	let id = req.body.id;
	Customer.update(customer, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"updated successfully a customer with id = " + id});
				   });	
};
 
// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.customerId;
	Customer.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'deleted successfully a customer with id = ' + id});
	});
};

exports.create2 = (req,res)=>{
    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
	};
	if(data.password === '' || data.username === ''){
		res.json('โปรดกรอก username และ password');
	} else 
	Customer.findOne({
		where : {
			username : data.username
		}
	}).then(user =>{
		if (user != null){
			res.json('username already exists')
		} else {
			Customer.create({
				firstname: data.firstname,
				lastname: data.lastname,
				email: data.email,
				username: data.username,
				password: data.password,
				type: 1
			  }).then(() => {
				console.log('user created in db');
				res.status(200).send({ message: 'user created' });
			  });
		}
	})
  }

exports.Login = (req,res) =>{
	Customer.findOne({
		where: {
		  username: req.body.username,
		  password: req.body.password
		}
	  })
		.then(user => {
		  if (user) {
			let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
			  expiresIn: 5000
			})
			res.json({ token: token })
		  } else {
			console.log('user not exit')
			res.send('User does not exist')
		  }
		})
		.catch(err => {
		  res.send('error: ' + err)
		})
}

exports.Profile = (req,res) =>{
	var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

	Customer.findOne({
	  where: {
		id: decoded.id
	  }
	})
	  .then(user => {
		if (user) {
		  res.json(user)
		} else {
		  res.send('User does not exist')
		}
	  })
	  .catch(err => {
		res.send('error: ' + err)
	  })
}

exports.getUID = (req,res) =>{
	Customer.max('user_id')
	.then(max =>{
		res.json(max)
	})
}
