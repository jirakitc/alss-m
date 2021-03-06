module.exports = function(app) {
 
    const class_Data = require('../controller/class.controller.js');

    app.post('/api/add-class', class_Data.create_Class)

    app.get('/api/get-class', class_Data.getClass)

    app.get('/api/get-enrolled-class' , class_Data.getEnrollClass)

    app.get('/api/get_maxClassID',class_Data.getMaxID)

    app.get('/api/getClassID/:classId', class_Data.getClassID)

    app.post('/api/delClass', class_Data.delClass)
}