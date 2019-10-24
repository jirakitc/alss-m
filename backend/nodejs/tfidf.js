const TfIdf = require('node-tfidf');
const tf = new TfIdf();

tf.addDocument('')

console.log("มาก =====================")
tf.tfidfs('มาก', function(i , measure){
    console.log('document #' + i + ' is ' + measure);
})