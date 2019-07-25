module.exports = function(app) {
 
    const subject = require('../controller/subject.controller.js');

    app.post('/api/add_subject', subject.create_Subject);

    app.get('/api/get_subject', subject.show_Subject);

}