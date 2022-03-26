import React from 'react'
import { Modal, Button, Icon, Input } from 'semantic-ui-react'

export default function AddNewCounterModal({open, setOpen}) {
  let formFields = {
      label: {
          value: null,
          errors: []
      },
      keyBindCode: {
          value: null,
          errors: []
      },
      position: {
          value: null,
          errors: []
      }
  }
  const getFormData = () => {

  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

  }

  return (
    <Modal
    closeIcon
    size="small"
    open={open}
    onClose={() => setOpen(false)}
  >
    <Modal.Header>Add new counter</Modal.Header>
    <Modal.Content>
      <form onSubmit={handleFormSubmit}>
        <Input placeholder="Counter label"></Input>
      </form>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={() =>  setOpen(false)}>
        Cancel
      </Button>
      <Button positive onClick={() =>  setOpen(false)}>
        Add new&nbsp;&nbsp;<Icon name={"add"}/>
      </Button>
    </Modal.Actions>
  </Modal>
  )
}
