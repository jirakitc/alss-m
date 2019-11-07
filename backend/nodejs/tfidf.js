const TfIdf = require('node-tfidf');
const tfidf = new TfIdf();

tfidf.addDocument('แสดง ข้อมูล นิสิต จาก น้อยไปมาก')
tfidf.addDocument('แสดง ข้อมูล ความ สูง จาก ต่ำไปสูง')
tfidf.addDocument('แสดง ข้อมูล นิสิต จาก มากไปน้อย')
tfidf.addDocument('โปรแกรม จัดการ ฐานข้อมูล')
tfidf.addDocument('เรียง ลำดับ โครงสร้าง มากไปน้อย')


console.log("มาก =====================");
tfidf.tfidfs('มากไปน้อย', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});
