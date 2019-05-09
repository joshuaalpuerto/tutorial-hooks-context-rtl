import React from 'react'
import { render } from 'react-testing-library'
import Experience from '../Experience'

describe('Options', () => {
  const label = 'Option1'
  const value  = 'options1'
  const { getByText } = render(<Experience id={value} label={label} />)
  const input = getByText(label)

  it('Should show on the document', () => {
    expect(input).toBeInTheDocument()
  })
  
  it('Should show on the document', () => {
    expect(input.value).toEqual(value)
  })
})