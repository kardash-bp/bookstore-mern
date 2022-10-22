import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export function inputGroupField(key, value) {
  return (
    <>
      <InputGroup>
        <InputGroup.Text id='inputGroup-sizing-default'>{key}</InputGroup.Text>
        <Form.Control
          type='text'
          value={value}
          aria-label='Default'
          aria-describedby='inputGroup-sizing-default'
          readOnly
        />
      </InputGroup>
      <br />
    </>
  )
}
