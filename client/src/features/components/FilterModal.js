import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ShopSidebar from './ShopSidebar'

function FilterModal({
  toggle = false,
  resetToggle,
  filtersHandler,
  categories,
}) {
  const [show, setShow] = useState(toggle)

  const handleClose = () => {
    setShow(false)
    resetToggle()
  }
  // const handleShow = () => setShow(true)
  // useEffect(()=>{

  // },[show])
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShopSidebar
            categories={categories}
            filtersHandler={filtersHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default FilterModal
