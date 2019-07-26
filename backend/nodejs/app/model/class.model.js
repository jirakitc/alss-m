module.exports = (sequelize, Sequelize) => {
	const Room = sequelize.define('class', {
		class_id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		class_name: Sequelize.STRING,
		class_Subject: Sequelize.STRING,
		teacher_name: Sequelize.STRING,
		total_student: Sequelize.INTEGER,

	}, { timestamps: false });

	return Room;
}