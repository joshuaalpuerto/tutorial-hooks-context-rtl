import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Form from '../Form'

describe('Form', () => {

  it('should submit value if data is complete', () => {
    const props = {
      onSubmit: jest.fn()
    }
    const { getByText, getByLabelText } = render(<Form {...props} />)

    const input = getByLabelText("skill")
    fireEvent.change(input, { target: { value: 'React testing library' }})

    const select = getByLabelText("experience")
    fireEvent.change(select, { target: { value: '< 1 year' }})

    fireEvent.click(getByText('Submit'))

    expect(props.onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should NOT submit if Input is empty', () => {
    const props = {
      onSubmit: jest.fn()
    }
    const { getByText, getByLabelText } = render(<Form {...props} />)

    const select = getByLabelText("experience")
    fireEvent.change(select, { target: { value: '< 1 year' }})

    fireEvent.click(getByText('Submit'))

    expect(props.onSubmit).toHaveBeenCalledTimes(0)
  })

  it('should NOT submit if select is empty', () => {
    const props = {
      onSubmit: jest.fn()
    }
    const { getByText, getByLabelText } = render(<Form {...props} />)

    const input = getByLabelText("skill")
    fireEvent.change(input, { target: { value: 'React testing library' }})

    fireEvent.click(getByText('Submit'))

    expect(props.onSubmit).toHaveBeenCalledTimes(0)
  })
})