module.exports = (sequelize, Sequelize) => {
	const Customer = sequelize.define('user', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id :{
			type: Sequelize.STRING,
			primaryKey: true
		},
		firstname: Sequelize.STRING,
		lastname: Sequelize.STRING,
		email: Sequelize.STRING,
		username: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		type: {
			type: Sequelize.INTEGER,
			allowNull: false,
		}
	}, { timestamps: false });

	return Customer;
}