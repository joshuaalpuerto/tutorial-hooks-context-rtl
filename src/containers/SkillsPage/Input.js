import React from 'react'

import Input from 'components/Input'

import {
  InputWrapper
} from './styled'

const InputHandler = React.memo(({ value, onInputChange }) => {
  return (
    <InputWrapper>
      <Input
        minLength={4}
        maxLength={255}
        dv
        placeholder="Nodejs, Postgres, React, etc."
        name="name"
        value={value}
        onChange={onInputChange}
        required
      />
    </InputWrapper>
  )
})


export default InputHandler