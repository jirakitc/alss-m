module.exports = (sequelize, Sequelize) => {
	const Room = sequelize.define('class', {
		class_id: {
			type: Sequelize.STRING,
			primaryKey: true
		},
		class_name: Sequelize.STRING,
		class_Subject: Sequelize.STRING,
		teacher_name: Sequelize.STRING,

	}, { timestamps: false });

	return Room;
}