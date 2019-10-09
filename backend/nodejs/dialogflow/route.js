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
        createEntityType()
    })

    //สร้าง Entity
    app.post('/api/createEntity',(req,res)=>{
      var v1 = ''
      var v2 = ''
      var v3 = ''
      var v4 = ''
        async function createEntity(
            projectId = _projectId,
            entityTypeId = req.body.entityTypeId,
            entityValue = req.body.entityValue,
            synonyms = [
              v1=req.body.synonyms1,
              v2=req.body.synonyms2,
              v3=req.body.synonyms3,
              v4=req.body.synonyms4,
            ]
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
          
            const [response] = await entityTypesClient.batchCreateEntities(createEntitiesRequest);
            console.log('Created entity type:');
            console.log(response);
            res.json({ID : entityType.entityTypeId})
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
            var eT = []
            const [response] = await entityTypesClient.listEntityTypes(request);
            response.forEach(entityType => {

              console.log(`Entity type name: ${entityType.name}`);
              console.log(`Entity type display name: ${entityType.displayName}`);
              console.log(`Number of entities: ${entityType.entities.length}\n`);
              
              var entityname = entityType.name
              var entitynameSplit = entityname.split("projects/sunlit-descent-239004/agent/entityTypes/")

              eT.push(entitynameSplit[1])
            });
            
            res.json(eT);
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
      const _displayName = req.body.displayName
      const _text = req.body.text
      const _entityType = `@`+req.body.entityType
      const _alias = req.body.entityType
      const _messageTexts = req.body.messageText
      const Xpart = {
        displayName: _displayName,
        text: _text,
        entityType: _entityType,
        alias: _alias
      }

      async function createIntent(
        projectId = _projectId,
        displayName = _displayName,
        trainingPhrasesParts = [Xpart],
        messageTexts = [_messageTexts]
      ) {
        const dialogflow = require('dialogflow');
        const intentsClient = new dialogflow.IntentsClient({credentials : auth});
        const agentPath = intentsClient.projectAgentPath(projectId);    
        const trainingPhrases = [];
        
        trainingPhrasesParts.forEach(Xpart => {
          const part = {
            text: Xpart.text,
            entityType: Xpart.entityType,
            alias: Xpart.alias
          };

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