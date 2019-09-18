module.exports = function(app) {
 
    const conTent = require('../controller/content.controller.js');
    
    app.post('/api/uploadcontent', conTent.uploadConTent)

    app.get('/api/class/:classId', conTent.getClassId);

    app.get('/api/getContentData/:classId', conTent.getContentData);
}