import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
  <Modal
    isOpen={!!props.optionModal}
    onRequestClose={props.handleClearModal}
    contentLabel='Selected Option'
  >
    <h2>Selected Option</h2>
    {props.optionModal && <p>{props.optionModal}</p>}
    <button onClick={props.handleClearModal}>Okay</button>
  </Modal>
);

export default OptionModal;
