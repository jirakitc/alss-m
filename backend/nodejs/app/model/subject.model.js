module.exports = (sequelize, Sequelize) => {
	const Subject = sequelize.define('subject', {
		subject_id: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		subject_Name: Sequelize.STRING,
		subject_Description: Sequelize.STRING,
	}, { timestamps: false });

	return Subject;
}