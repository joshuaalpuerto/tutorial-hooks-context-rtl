import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Card, { DEFAULT_COLOR } from '../index'

import 'jest-styled-components'

describe('IdWrapper', () => {
  const props = {
    id: 1,
    heading: 'React',
    subheading: '1 year'
  }

  it('should have id existing', () => {
    const { getByTestId } = render(<Card {...{ ...props }} />)
    expect(getByTestId('id')).toHaveTextContent(props.id)
  })

  it('Should have default bgColor even null values submitted', () => {
    const { container, getByTestId } = render(<Card {...{ ...props, color: null }} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(getByTestId('id')).toHaveStyleRule('background-color', DEFAULT_COLOR)
  })

  it('should be background default #80878B', () => {
    const { container, getByTestId } = render(<Card {...{ ...props }} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(getByTestId('id')).toHaveStyleRule('background-color', DEFAULT_COLOR)
  })

  it('should have different background color if passes as prop', () => {
    const subProps = {
      ...props,
      color: 'lightgreen'
    }
    const { container, getByTestId } = render(<Card {...{ ...subProps }} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(getByTestId('id')).toHaveStyleRule('background-color', subProps.color)
  })
})

describe('ContentWrapper', () => {
  const props = {
    id: 1,
    heading: 'React',
    subheading: '1 year'
  }

  it('should have heading and subheading content', () => {
    const { getByText } = render(<Card {...{ ...props }} />)
    expect(getByText(props.heading)).toBeInTheDocument()
    expect(getByText(props.subheading)).toBeInTheDocument()
  })

  it('should have null subheading content if not define', () => {
    const props = {
      id: 1,
      heading: 'React',
    }
    const { queryByTestId } = render(<Card {...{ ...props }} />)
    expect(queryByTestId('subheading')).toBeNull()
  })
})

describe('Remove', () => {
  const props = {
    id: 1,
    heading: 'React',
    subheading: '1 year'
  }

  it('should show "X" icon for deletion', () => {
    const DeleteComponent = () => <div> X </div>
    const subProps = {
      ...props,
      renderDelete: DeleteComponent
    }

    const { getByText } = render(<Card {...{ ...subProps }} />)
    expect(getByText('X')).toBeInTheDocument()
  })

  it('Remove should be empty if renderDelete is not provided', () => {
    const { getByTestId } = render(<Card {...{ ...props }} />)
    expect(getByTestId('remove')).toBeEmpty()
  })
})

