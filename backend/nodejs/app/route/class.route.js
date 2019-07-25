module.exports = function(app) {
 
    const class_Data = require('../controller/class.controller.js');

    app.post('/api/add-class', class_Data.create_Class)

    app.get('/api/get-class', class_Data.getClass)

}