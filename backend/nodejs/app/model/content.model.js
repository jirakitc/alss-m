module.exports = (sequelize, Sequelize) => {
	const conTent = sequelize.define('content', {
		content_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		class_id: Sequelize.STRING,
		content_name: Sequelize.STRING,
        content_address : Sequelize.STRING,
	}, { timestamps: false });

	return conTent;
}