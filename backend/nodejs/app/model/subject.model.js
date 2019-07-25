module.exports = (sequelize, Sequelize) => {
	const Subject = sequelize.define('subject', {
		subject_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		  },
		  subject_Name: Sequelize.STRING,
		  subject_Description: Sequelize.STRING,
		}, { timestamps: false });
	
	return Subject;
}