import { Actions, Manager } from '@twilio/flex-ui';
import axios from 'axios';

export const startCall = (number, channel) => {
  Actions.invokeAction('StartOutboundCall', {
      destination: number,
      type: channel
  });
};

export const sendMessage = async (number, channel) => {
    const manager = Manager.getInstance();
    const token = await manager.user.token;
    const workerSid = manager.workerClient.sid

  let formattedNumber = number;
  if (channel === 'whatsapp') {
    formattedNumber = `whatsapp:${number}`;
  }

  try {
    await axios.post(process.env.START_CONVERSATION_FUNCTION, {
            Token: token,
            workerSid: workerSid,
            customerAddress: formattedNumber,
            type: channel
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};