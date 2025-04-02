# Start Outbound Conversation

The Twilio Plugin is intended for use within the Salesforce integration. When an agent attempts to start an outbound engagement with a customer, it prompts them to select the communication channel (Call, SMS, or WhatsApp).

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

## Serveless
```
Rename .env.example to .env and update environment variables 

ACCOUNT_SID=ACXXX
AUTH_TOKEN=XXXX
WORKSPACE_SID=WSXXX
WORKFLOW_SID=WWXXX
QUEUE_SID=WQXXX
PROXY_ADDRESS=<TwilioNumber>
```

Deploy serverless environment
```bash
cd serverless/outbound-conversations
npm install
twilio serverless:deploy
```

## Plugin
```
Rename .env.example to .env and then add the function URL
```