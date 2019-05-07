import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Button from '../index'

test('Should have the correct children', () => {
  const buttonTitle = 'Click here'
  const { getByText } =render(<Button> { buttonTitle } </Button>)

  expect(getByText(buttonTitle)).toBeInTheDocument()
})

test('Should fire onClick when trigger', () => {
  const fn = jest.fn()
  const buttonTitle = 'Click here'
  const { getByText } =render(<Button onClick={fn}> { buttonTitle } </Button>)

  fireEvent.click(getByText(buttonTitle))

  expect(fn).toHaveBeenCalledTimes(1)
})

