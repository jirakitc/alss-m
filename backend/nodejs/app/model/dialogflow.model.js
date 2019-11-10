module.exports = (sequelize, Sequelize) => {
	const Quiz = sequelize.define('quiz', {
		quiz_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		class_id: Sequelize.STRING,
        quiz_name: Sequelize.STRING,
    }, { timestamps: false });
	return Quiz;
}