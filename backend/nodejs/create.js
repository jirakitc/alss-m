'use strict';

const express = require('express');
const app = express();
const dialogflow = require('dialogflow');

// Read in credentials from file. To get it, follow instructions here, but
// choose 'API Admin' instead of 'API Client':
// https://dialogflow.com/docs/reference/v2-auth-setup
const credentials = require('./credentials.json');

const entitiesClient = new dialogflow.EntityTypesClient({
 credentials: credentials,
});

const projectId = 'sunlit-descent-239004';

const intentsClient = new dialogflow.IntentsClient();
const agentPath = entitiesClient.projectAgentPath(projectId);

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

