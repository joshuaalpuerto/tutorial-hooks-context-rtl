import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Select from '../index'

test('Should update value on update', () => {
  const { getByLabelText } =render(
    <Select name="sex" aria-label="sex">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </Select>
  )
  const select = getByLabelText('sex')
  fireEvent.change(select, { target: { value: 'saab' } })

  expect(select.value).toBe('saab')
})


test('Should onChange handler and trigger on change', () => {
  const onChange = jest.fn()
  const { getByLabelText } =render(
    <Select name="sex" aria-label="sex" onChange={onChange}>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </Select>
  )

  const select = getByLabelText('sex')
  fireEvent.change(select, { target: { value: 'mercedes' } })

  expect(onChange).toHaveBeenCalled()
})


