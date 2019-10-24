const dialogflow = require('dialogflow');
const uuid = require('uuid');
const auth = require('../auth.json')
async function runSample(projectId = 'sunlit-descent-239004') {
    const sessionId = uuid.v4();
    const sessionClient = new dialogflow.SessionsClient({credentials: auth});
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: 'น้อยไปมาก',
          languageCode: 'th',
        },
      },
    };
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  คำที่ส่ง: ${result.queryText}`);
    console.log(`  คำตอบ: ${result.fulfillmentText}`);
    console.log(`  ค่าความแม่นยำ: ${result.intentDetectionConfidence}`);
    console.log(`  data: ${result.parameters}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`ไม่พบคำตอบ`);
    }
  }
  runSample()