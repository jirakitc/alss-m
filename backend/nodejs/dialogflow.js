const dialogflow = require('dialogflow');
const intentsClient = new dialogflow.IntentsClient();

projectId = "sunlit-descent-239004"

// The path to identify the agent that owns the created intent.
const agentPath = intentsClient.projectAgentPath(projectId);

const trainingPhrases = [];

trainingPhrasesParts.forEach(trainingPhrasesPart => {
  const part = {
    text: trainingPhrasesPart,
  };

  // Here we create a new training phrase for each provided part.
  const trainingPhrase = {
    type: 'EXAMPLE',
    parts: [part],
  };

  trainingPhrases.push(trainingPhrase);
});

const messageText = {
  text: messageTexts,
};

const message = {
  text: messageText,
};

const intent = {
  displayName: displayName,
  trainingPhrases: trainingPhrases,
  messages: [message],
};

const createIntentRequest = {
  parent: agentPath,
  intent: intent,
};

// Create the intent
const responses = await intentsClient.createIntent(createIntentRequest);
console.log(`Intent ${responses[0].name} created`);