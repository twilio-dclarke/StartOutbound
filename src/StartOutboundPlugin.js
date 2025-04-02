import { FlexPlugin } from '@twilio/flex-plugin';
import { CustomizationProvider } from "@twilio-paste/core/customization";
import { isSalesForce } from './utils/salesforce';
import React from 'react';
import {Actions} from '@twilio/flex-ui';
import ContactModal from './components/ContactModal';



const PLUGIN_NAME = 'StartOutboundPlugin';

export default class StartOutboundPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const sfdcBaseUrl = window.location.ancestorOrigins[0];
    if (!isSalesForce(sfdcBaseUrl)) {
      console.warn('Not initializing Salesforce since this instance has been launched independently.');
      return;
    }

    flex.setProviders({
      PasteThemeProvider: CustomizationProvider
    });

    flex.MainContainer.Content.add(
      <ContactModal key="contact-modal" />
    );

    Actions.replaceAction('StartOutboundCall', async (payload, original) => {
      const customerNumber = payload.destination;
      if (payload.type == 'call') {
        return original(payload)
      };
    });
  }
}