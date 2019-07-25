module.exports = function(app) {
 
    const classStu = require('../controller/classStu.controller.js');

    app.post('/api/enroll', classStu.enroll_Class)


}