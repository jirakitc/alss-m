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
            //name = responses[0].name.split("projects/sunlit-descent-239004/agent/entityTypes/")
            res.json(`สร้างหัวข้อ ${_displayName} เรียบร้อย`)
          }
        createEntityType()
    })

    //สร้าง Entity
    app.post('/api/createEntity',(req,res)=>{
      var v1 = ''
      var v2 = ''
      var v3 = ''
      var v4 = ''
      var vall = `${req.body.synonyms1}, ${req.body.synonyms2}, ${req.body.synonyms3}, ${req.body.synonyms4}`
      const _chapter = req.body.chapter
      const _class_id = req.body.class_id

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
            // res.json({ID : entityType.entityTypeId})
            res.json(`เพิ่มข้อมูลเรียบร้อยเรียบร้อย`)

            const db = require('../app/config/db.config.js');
            const Quiz = db.quiz;
  
          Quiz.update
          (
            { keyword : vall },
            { where: { class_id : _class_id, chapter : _chapter}}
          );
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
            var entityID = []
            var entityName = []
            const [response] = await entityTypesClient.listEntityTypes(request);
            response.forEach(entityType => {
              // console.log(`Entity type name: ${entityType.name}`);
              // console.log(`Entity type display name: ${entityType.displayName}`);
              // console.log(`Number of entities: ${entityType.entities.length}\n`);    
              var entityname = entityType.name
              var entitynameSplit = entityname.split("projects/sunlit-descent-239004/agent/entityTypes/")

              entityID.push(entitynameSplit[1])
              entityName.push(entityType.displayName)
            }); 
            res.json(entityID);
            console.log(entityName)
            return response;
          }
          listEntityTypes();
    })
    app.get('/api/listEntityTypeN',(req,res)=>{
      async function listEntityTypesN(projectId = _projectId) {

          const dialogflow = require('dialogflow');
          const entityTypesClient = new dialogflow.EntityTypesClient({credentials: auth});
          const agentPath = entityTypesClient.projectAgentPath(projectId);      
          const request = {
            parent: agentPath,
          };
          var entityName = []
          const [response] = await entityTypesClient.listEntityTypes(request);
          response.forEach(entityType => {
            // console.log(`Entity type name: ${entityType.name}`);
            // console.log(`Entity type display name: ${entityType.displayName}`);
            // console.log(`Number of entities: ${entityType.entities.length}\n`);    

            entityName.push(entityType.displayName)
          }); 
          res.json(entityName);
          //console.log(entityName)
          return response;
        }
        listEntityTypesN();
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

    //เอาเลข ClassID
    app.get('/api/getClassID',(req,res)=>{
    const db = require('../app/config/db.config');  
    const Class = db.class;
      Class.findAll({
        attributes: ['class_name','class_id']
      }).then(result => {
        res.json(result);
      });
    })

    //สร้าง Intent
    app.post('/api/createIntents',(req,res)=>{
      const _class_id = req.body.class_id
      const _chapter = req.body.chapter

      const _displayName = req.body.displayName
      const _text1 = req.body.text1
      const _text2 = req.body.text2
      const _text3 = req.body.text3
      const _entityType = `@`+req.body.entityType
      const _alias = req.body.entityType
      const _messageTexts = req.body.messageText
      const Xpart1 = {
        
        text: _text1,
        entityType: _entityType,
        alias: _alias
      }
      const Xpart2 = {
        
        text: _text2,
        entityType: _entityType,
        alias: _alias
      }
      const Xpart3 = {
        
        text: _text3,
        entityType: _entityType,
        alias: _alias
      }

      async function createIntent(
        projectId = _projectId,
        displayName = _displayName,
        trainingPhrasesParts = [Xpart1,Xpart2,Xpart3],
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
        //console.log(`Intent ${responses[0].name} created`);
        res.json(`สร้างคำถาม ${_displayName} เรียบร้อย`)

        var Intentname = responses[0].name
        var IntentnameSplit = Intentname.split("projects/sunlit-descent-239004/agent/intents/")
        var _Intentname = (IntentnameSplit[1])
        

        const db = require('../app/config/db.config.js');
        const Quiz = db.quiz;
  
          Quiz.create({
            class_id : _class_id,
            quiz_name : _displayName,
            intent_id : _Intentname,
            chapter : _chapter,
            answer : _messageTexts
          })
          //console.log(_Intentname)
      }
      createIntent()
    })

  // ลบ Intent
    app.post('/api/deleteIntents',(req,res)=>{
      const _IntentId = req.body.intent_id
      async function deleteIntent(projectId = _projectId, intentId = _IntentId) {
        const dialogflow = require('dialogflow');
      
        // Instantiates clients
        const intentsClient = new dialogflow.IntentsClient({credentials: auth});
      
        const intentPath = intentsClient.intentPath(projectId, intentId);
      
        const request = {name: intentPath};
      
        // Send the request for deleting the intent.
        const result = await intentsClient.deleteIntent(request);
        console.log(`Intent ${intentPath} deleted`);
        res.json(`ลบคำถามเรียบร้อย`)
        return result;
        
      }
      deleteIntent()
    })

  }