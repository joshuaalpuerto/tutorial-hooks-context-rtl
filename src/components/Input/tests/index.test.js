import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Input from '../index'

test('Should update value on update', () => {
  const { getByLabelText } =render(<Input name="firstName" aria-label="first-name"/>)
  const input = getByLabelText('first-name')
  fireEvent.change(input, { target: { value: 'testdev' } })

  expect(input.value).toBe('testdev')
})

test('Should onChange handler and trigger on change', () => {
  const onChange = jest.fn()
  const { getByLabelText } =render(<Input name="firstName" aria-label="first-name" onChange={onChange}/>)
  const input = getByLabelText('first-name')
  fireEvent.change(input, { target: { value: 'testdev' } })

  expect(onChange).toHaveBeenCalled()
})


