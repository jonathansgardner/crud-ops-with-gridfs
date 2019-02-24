import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Modal.css';

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={ props.onDismiss } className="screen-overlay">
      <div onClick={ (e) => e.stopPropagation() } className="modal-window">
        <h2 className="modal-header">{ props.title }</h2>
        <div className="modal-content">{ props.content }</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
}

export default Modal;
