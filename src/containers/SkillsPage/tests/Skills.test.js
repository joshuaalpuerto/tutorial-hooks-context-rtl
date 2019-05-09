import React from 'react'
import { render } from 'react-testing-library'
import { DEFAULT_COLOR } from 'components/Card'
import Skills from '../Skills'

import 'jest-styled-components'

describe('Skills', () => {

  it('should show empty if skills are empty', () => {
    const props = {
      skills: [],
      onDelete: () => {}
    }
    const { getByTestId } = render(<Skills {...props} />)
   
    expect(getByTestId("empty-skills")).toBeInTheDocument()
  })

  it('should NOT show empty label if skills are  NOT empty', () => {
    const props = {
      skills: [{
        "id": 134,
        "name": "GraphQL",
        "experience": "< 1 Year"
      }],
      onDelete: () => {}
    }

    const { queryAllByTestId } = render(<Skills {...props} />)
    const length = queryAllByTestId("empty-skills").length

    expect(length).toEqual(0)
  })

  it('should show cards same number as passed skills', () => {
    const props = {
      skills: [{
        "id": 134,
        "name": "GraphQL",
        "experience": "< 1 Year"
      }],
      onDelete: () => {}
    }

    const { getByText } = render(<Skills {...props} />)
    expect(getByText('134')).toBeInTheDocument()
    expect(getByText('GraphQL')).toBeInTheDocument()
    expect(getByText("< 1 Year")).toBeInTheDocument()
  })

  describe('Card Colors', () => {
    const props = {
      skills: [{
        "id": 131,
        "name": "GraphQL",
        "experience": "< 1 Year"
      },  {
        "id": 132,
        "name": "GraphQL",
        "experience": "< 1 Year"
      }, {
        "id": 133,
        "name": "GraphQL",
        "experience": "< 1 Year"
      }, {
        "id": 134,
        "name": "GraphQL",
        "experience": "< 1 Year"
      }, {
        "id": 135,
        "name": "GraphQL",
        "experience": "< 1 Year"
      }, {
        "id": 137,
        "name": "GraphQL",
        "experience": "< 1 Year"
      }, {
        "id": 138,
        "name": "GraphQL",
        "experience": "< 1 Year"
      }],
      onDelete: () => {}
    }

    it('should show "#24333C" background color for the card < 5', () => {
      const { getByText } = render(<Skills {...props} />)
      const card = getByText('135')
      expect(card).toHaveStyleRule('background-color', '#24333C')
    })

    it('should show "#24333C" background color for the card > 5', () => {
      const { getByText } = render(<Skills {...props} />)
      const card = getByText('138')
      expect(card).toHaveStyleRule('background-color', DEFAULT_COLOR)
    })
  })
})