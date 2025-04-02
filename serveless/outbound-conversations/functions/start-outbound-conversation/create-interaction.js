const TokenValidator = require('twilio-flex-token-validator').functionValidator;

const getRoutingProperties = (context, type, workerSid, customerAddress) => {
  return {
    type: 'TaskRouter',
    properties: {
      workspace_sid: context.WORKSPACE_SID,
      workflow_sid: context.WORKFLOW_SID,
      queue_sid: context.QUEUE_SID,
      worker_sid: workerSid,
      task_channel_unique_name: type,
      attributes: {
        customerAddress: customerAddress,
        name: customerAddress
      }
    } 
  }
}

const getChannelProperties = (context, type, customerAddress) => {
  return {
    type: type,
    initiated_by: 'agent',
    properties: { type: "sms" },
    participants: [
      {
        address: customerAddress,
        proxy_address: context.PROXY_ADDRESS,
      }
    ]
  }
}

const createInteraction = async (context, routing, channel) => {
  const client = context.getTwilioClient();
  const interaction = await client.flexApi.v1.interaction.create({
    channel : channel,
    routing : routing
  })

  return interaction
}



exports.handler = TokenValidator(async function (context, event, callback) {
  const { workerSid, customerAddress, type } = event;
  const routing = getRoutingProperties(context, type, workerSid, customerAddress);
  const channel = getChannelProperties(context, type, customerAddress);
  console.log(routing)
  console.log(channel)
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const interaction = await createInteraction(context, routing, channel);
    response.appendHeader('Content-Type', 'application/json');
    response.setBody(interaction);
    response.setStatusCode(200);
  } catch (err) {
    console.error(err)
    response.appendHeader('Content-Type', 'plain/text');
    response.setBody(err.message);
    response.setStatusCode(500);
  }
  
  callback(null, response);
});
