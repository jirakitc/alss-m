module.exports = (sequelize, Sequelize) => {
	const classStu = sequelize.define('class_student', {
        cs_list: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        class_id: Sequelize.INTEGER,
        class_name:Sequelize.STRING,
        user_id: Sequelize.INTEGER,          
		}, { timestamps: true });
	
	return classStu;
}