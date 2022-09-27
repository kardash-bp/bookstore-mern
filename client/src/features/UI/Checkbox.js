import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
const Checkbox = ({ filMet, data, filtersHandler }) => {
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  )
  const [checked, setChecked] = useState([])

  const checkToggleHandler = (event) => {
    if (filMet === 'category') {
      const id = event.target.value
      if (checked.indexOf(id) === -1) {
        setChecked((prev) => [...prev, id])
      } else {
        const arr = checked.filter((c) => c !== id)
        setChecked([...arr])
      }
    }
    if (filMet === 'price') {
      const position = data.findIndex(
        (el) => JSON.stringify(el.range) === event.target.value
      )

      let arr = checkedState
      arr = arr.map((el, i) => {
        return i === position ? !el : false
      })
      setCheckedState(arr)
      setChecked(JSON.parse(event.target.value))
    }
  }

  useEffect(() => {
    filtersHandler(checked, filMet)
  }, [checked, filMet])

  console.log('check rendered')

  return data.map((c, i) => (
    <li key={i} className='list-unstyled mb-3'>
      <Form.Check
        type='checkbox'
        label={c.name}
        value={filMet === 'category' ? c._id : JSON.stringify(c.range)}
        onChange={(event) => checkToggleHandler(event)}
        checked={checkedState[i]}
      />
    </li>
  ))
}

export default React.memo(Checkbox)
