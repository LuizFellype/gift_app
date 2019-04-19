import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'

export const useInput = (inputProps, initialValue = '') => {
  const [value, setvalue] = useState(initialValue)

  return {
    value,
    onChange: e => setvalue(e.currentTarget.value),
    ...inputProps
  }
}

export const Input = props => {
  return (
    <div className='input-block'>
      <label htmlFor={props.id} style={{ marginBottom: '3px' }}>
        {props.label}
      </label>
      <InputText {...props} />
    </div>
  )
}
