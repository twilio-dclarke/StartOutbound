import React, { useReducer } from 'react';
import {
    Modal,
    Button,
    ModalFooter,
    ModalHeading,
    ModalHeader,
    ModalFooterActions,
    ModalBody,
    Select,
    Option,
    Label
} from '@twilio-paste/core';
import { sendMessage, startCall } from '../utils/contactUtils';
import { Actions } from '@twilio/flex-ui';

const initialModalState = {
    isOpen: false,
    customerNumber: null,
    type: 'call',
}

const ContactModal = () => {
    const [modalState, setModalState] = useReducer((modalState, updatedModalState) => ({ ...modalState, ...updatedModalState }), initialModalState);
    Actions.addListener('beforeStartOutboundCall', (payload) => { 
        if (payload.type) {
            return;
        }

        setModalState({
            isOpen: true,
            customerNumber: payload.destination,
        })
    })

    const handleContact = (type) => {
        if (type === 'call') {
            startCall(modalState.customerNumber, type);
        } else {
            sendMessage(modalState.customerNumber, type);
        }
        setModalState(initialModalState);
    };

  return (
      <Modal ariaLabelledby="test" size="default" isOpen={modalState.isOpen} onDismiss={() => setModalState(initialModalState)} heading="Contact Customer">
        <ModalHeader>
            <ModalHeading as="h3">Contact Channel</ModalHeading>
          </ModalHeader>
          <ModalBody>
            <Label htmlFor="channel">Choose a Contact Channel</Label>
            <Select id="channelType" onChange={(e) => {
                modalState.type = e.target.value;
                setModalState(modalState);
            }}>
            <Option value="call">Call { modalState.customerNumber }</Option>
            <Option value="sms">SMS { modalState.customerNumber }</Option>
            <Option value="whatsapp">WhatsApp { modalState.customerNumber }</Option>
          </Select>
        </ModalBody>
        <ModalFooter>
            <ModalFooterActions>
                <Button variant="primary" onClick={() => handleContact(modalState.type)}>
                    Start
                </Button>
                <Button variant="secondary" onClick={() => setModalState(initialModalState)}>
                    Cancel
                </Button>
            </ModalFooterActions>
        </ModalFooter>
    </Modal>
  );
};

export default ContactModal;