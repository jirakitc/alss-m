module.exports = function(app) {
 
    const conTent = require('../controller/content.controller.js');
    
    app.post('/api/uploadcontent', conTent.uploadConTent)

    app.get('/api/class/:classId', conTent.getClassId);

    app.get('/api/getContentData/:classId', conTent.getContentData);

    app.post('/api/get_src',conTent.getAddress);

    app.get('/api/getQuiz/:classId', conTent.getQuiz);

    app.post('/api/getQuizPerId', conTent.getQuizPerId);

    app.post('/api/delQuiz',conTent.deleteQuiz)
}