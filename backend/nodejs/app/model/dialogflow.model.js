module.exports = (sequelize, Sequelize) => {
	const Quiz = sequelize.define('quiz', {
		quiz_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		class_id: Sequelize.STRING,
		quiz_name: Sequelize.STRING,
		keyword: Sequelize.STRING,
		chapter: Sequelize.STRING,
		intent_id : Sequelize.STRING,
		answer : Sequelize.STRING
    }, { timestamps: false });
	return Quiz;
}