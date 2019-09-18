module.exports = (sequelize, Sequelize) => {
	const classStu = sequelize.define('class_student', {
        cs_id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        class_id: Sequelize.STRING,
        class_name:Sequelize.STRING,
        user_id: Sequelize.STRING,
        teacher_name: Sequelize.STRING,        
        class_Subject: Sequelize.STRING, 
		}, { timestamps: true });
	
	return classStu;
}