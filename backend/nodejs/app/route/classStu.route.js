module.exports = function(app) {
 
    const classStu = require('../controller/classStu.controller.js');

    app.post('/api/enroll', classStu.enroll_Class)

    //app.get('/api/getcs/:userId' , classStu.getClassStu)

    app.get('/api/getcs' , classStu.getClassStu)

    app.get('/api/tcgetcs' , classStu.TCgetclass)
}