import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import deleteConfirm from '../../../../assets/images/deleteConfirm.svg';

export default function DeleteConfirm({show,handleClose,title,DeletedItem,isLoading}) {



  return <>
  
  <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        
        </Modal.Header>
        <Modal.Body >
            <div className="modal-container text-center ">
              <img src={deleteConfirm} alt="" />
              <h4>{title}</h4>
              <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>

        </Modal.Body>
        <Modal.Footer>
     
          <Button className='modalBtnDanger' variant="danger" onClick={DeletedItem}>

            {isLoading ? <i className='fa fa-spin fa-spinner'></i> : 'Delete this item'}
          
          </Button>
        </Modal.Footer>
      </Modal>
  </>
}
