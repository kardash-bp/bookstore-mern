import React from 'react'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
const TooltipHover = (props) => {
  const renderTooltip = () => {
    return <Tooltip>{props.text}</Tooltip>
  }
  return (
    <OverlayTrigger
      placement={'top'}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {props.children}
    </OverlayTrigger>
  )
}

export default TooltipHover
