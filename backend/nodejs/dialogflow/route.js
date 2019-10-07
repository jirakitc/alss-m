module.exports = function(app){
    const _projectId = 'sunlit-descent-239004'
    const auth = require('../auth.json')

    //สร้าง EntityType
    app.post('/api/createEntityType',(req,res)=>{
        const _displayName = req.body.displayName
        const _kind = 'KIND_MAP'
        async function createEntityType(
            projectId = _projectId,
            displayName = _displayName,
            kind = _kind
            ) {
            const dialogflow = require('dialogflow');
          
            const entityTypesClient = new dialogflow.EntityTypesClient({credentials : auth});

            const agentPath = entityTypesClient.projectAgentPath(projectId);
          
            const createEntityTypeRequest = {
              parent: agentPath,
              entityType: {
                displayName: displayName,
                kind: kind,
              },
            };
          
            const responses = await entityTypesClient.createEntityType(
              createEntityTypeRequest
            );
            console.log(`Created ${responses[0].name} entity type`);
          }
    })

    //สร้าง Entity
    app.post('',(req,res)=>{
        async function createEntity(
            projectId = _projectId,
            entityTypeId = req.body.entityTypeId,
            entityValue = req.body.entityValue,
            synonyms = req.body.synonyms
            ) {
            const dialogflow = require('dialogflow');
            const entityTypesClient = new dialogflow.EntityTypesClient({credentials: auth});
            const agentPath = entityTypesClient.entityTypePath(projectId, entityTypeId);
          
            const entity = {
              value: entityValue,
              synonyms: synonyms,
            };
          
            const createEntitiesRequest = {
              parent: agentPath,
              entities: [entity],
            };
          
            const [response] = await entityTypesClient.batchCreateEntities(
              createEntitiesRequest
            );
            console.log('Created entity type:');
            console.log(response);
          }
          createEntity();
    })

    //ดู EntityType
    app.get('/api/listEntityType',(req,res)=>{
        async function listEntityTypes(projectId = _projectId) {

            const dialogflow = require('dialogflow');

            const entityTypesClient = new dialogflow.EntityTypesClient({credentials: auth});

            const agentPath = entityTypesClient.projectAgentPath(projectId);
          
            const request = {
              parent: agentPath,
            };

            const [response] = await entityTypesClient.listEntityTypes(request);
            response.forEach(entityType => {
              console.log(`Entity type name: ${entityType.name}`);
              console.log(`Entity type display name: ${entityType.displayName}`);
              console.log(`Number of entities: ${entityType.entities.length}\n`);
            });
            return response;
          }
          listEntityTypes();
    })

    //ดู Intent
    app.get('/api/listIntents',(req,res)=>{
        async function listIntents(projectId = _projectId) {
            const dialogflow = require('dialogflow');

            const intentsClient = new dialogflow.IntentsClient({credentials: auth});

            const projectAgentPath = intentsClient.projectAgentPath(projectId);
          
            const request = {
              parent: projectAgentPath,
            };
          
            console.log(projectAgentPath);

            const [response] = await intentsClient.listIntents(request);
            response.forEach(intent => {
              console.log('====================');
              console.log(`Intent name: ${intent.name}`);
              console.log(`Intent display name: ${intent.displayName}`);
              console.log(`Action: ${intent.action}`);
              console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
              console.log(`Parent followup intent: ${intent.parentFollowupIntentName}`);
          
              console.log('Input contexts:');
              intent.inputContextNames.forEach(inputContextName => {
                console.log(`\tName: ${inputContextName}`);
              });
          
              console.log('Output contexts:');
              intent.outputContexts.forEach(outputContext => {
                console.log(`\tName: ${outputContext.name}`);
              });
            });
            // [END dialogflow_list_intents]
          }
          listIntents()
    })

    //สร้าง Intent
    app.post('/api/createIntents',(req,res)=>{
      async function createIntent(
        projectId = _projectId,
        displayName = 'pizza',
        trainingPhrasesParts = ['@city:New York'],
        // https://github.com/googleapis/nodejs-dialogflow/issues/411   อ่านต่อ
        messageTexts = ['yaaaa']
      ) {
        const dialogflow = require('dialogflow');

        const intentsClient = new dialogflow.IntentsClient({credentials : auth});

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
        // [END dialogflow_create_intent]
      }
      createIntent()
    })
}//end