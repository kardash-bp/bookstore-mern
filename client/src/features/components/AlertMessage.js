import React from 'react'
import Alert from 'react-bootstrap/Alert'

// variant:  'primary', 'secondary','success', 'danger', 'warning', 'info', 'light', 'dark'
// msg custom error or success
const AlertMessage = ({ variant, msg }) => {
  return (
    <Alert key={variant} variant={variant}>
      {msg}
    </Alert>
  )
}

export default AlertMessage
