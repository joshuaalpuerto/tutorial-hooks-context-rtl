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
})

describe('Remove', () => {
  const props = {
    id: 1,
    heading: 'React',
    subheading: '1 year'
  }

  it('should have "X" icon for deletion', () => {
    const subProps = {
      ...props,
      renderDelete: <div> X </div>
    }

    const { getByText } = render(<Card {...{ ...subProps }} />)
    // should be in the document
    expect(getByText('X')).toBeInTheDocument()
    // but it should be hidden
    expect(getByText('X')).not.toBeVisible()
  })

  /**
   * Skipped since it's too much unit testing as stated here
   * https://spectrum.chat/testing-library/general/how-do-i-test-styles-for-hover-events~108403f4-915b-4243-974c-c41af826b91d
   */
  it.skip('should show "X" on hover', () => {
    const subProps = {
      ...props,
      renderDelete: <div> X </div>
    }

    const { getByTestId } = render(<Card {...{ ...subProps }} />)
    const wrapper = getByTestId('wrapper')

    fireEvent.mouseOver(wrapper)

    // should be in the document
    expect(wrapper.querySelector('[data-testid="remove"]')).toHaveStyleRule('display', 'block')
  })

  it('Remove should be empty if renderDelete is not provided', () => {
    const { getByTestId } = render(<Card {...{ ...props }} />)
    expect(getByTestId('remove')).toBeEmpty()
  })
})

