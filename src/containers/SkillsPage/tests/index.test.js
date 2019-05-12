import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import ConnectedSkillsPage from '../index'

let spy = null

beforeEach(() => {
  spy = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => ({
      json() {
        return [{
          "id": 131,
          "name": "GraphQL",
          "experience": "< 1 Year"
        },  {
          "id": 132,
          "name": "GraphQL",
          "experience": "< 1 Year"
        }]
      }
    }))
})

afterEach(() => {
  // clear all mocks every after test so it has pristine state when use again.
  jest.resetAllMocks()
})
/**
 * On this test there is a warning
 * 
 * Warning: An update to SkillsPage inside a test was not wrapped in act(...).
 *   
 *   When testing, code that causes React state updates should be wrapped into act(...):
 *   
 *   act(() => {
 *     // fire events that update state 
 *   });
 *   // assert on the output
 * 
 * This issue is caused on how we call our API. 
 * We are requesting the api under useEffect. 
 * Once done then we update our Component after some `ms`. 
 * See issues: 
 *  - https://github.com/facebook/react/issues/14769
 *  - https://github.com/testing-library/react-testing-library/issues/281 
 *  - https://github.com/testing-library/react-testing-library/pull/343
 * 
 * This explanation by kent todd is insightful: https://github.com/testing-library/react-testing-library/issues/281#issuecomment-461140289
 * 
 * TLDR:
 *  issue is fixed on 16.8.9 of react w/c is still in alpha. 
 * - Creating setTimeout fix the issue we are just mocking the api but checking the actual element
 *   it still gives the error. we should wait for the 16.8.9
 * - This issue is because of re-rendering the component or trigger `setState` immediately. so solution we need to put timeout to our mock function.
 */
test('Should show number return of API', async () => {
  const { findByText,debug } = render(<ConnectedSkillsPage />)
  const skillId = await findByText('132')

  expect(skillId).toBeInTheDocument()
  expect(spy).toHaveBeenCalledTimes(1)
})

// Test if we click submit
test('Should add the skill that is submitted', async () => {
  const postPayload = {
    id: 140,
    name: 'React testing library',
    experience: '< 1 year'
  }
  const { findByText, findByLabelText } = render(<ConnectedSkillsPage />)

  //After rendering change the spy value once as if we are posting
  spy.mockReturnValueOnce({
    json() {
      return new Promise((resolve) => {
        // wrapping into setTimeout to ensure we don't trigger it immediately
        setTimeout(() =>
          resolve(postPayload)
        )
      }) 
    }
  })
  
  // Add values
  const input = await findByLabelText("skill")
  const select = await findByLabelText("experience")
  const button = await findByText("Submit")
  
  fireEvent.change(input, { target: { value:  postPayload.name}})
  fireEvent.change(select, { target: { value: postPayload.experience }})
  fireEvent.click(button)
  
  // ensure that we posted successfully and displayed the new skill
  const skillId = await findByText(`${postPayload.id}`) //convert to id since on DOM it is not number
  
  expect(skillId).toBeInTheDocument()
  // Called two times requesting initial data
  // then when posting
  expect(spy).toHaveBeenCalledTimes(2)
})

// Test if we click delete
test('Should delete skill', async () => {
  const { findAllByTestId, queryByText } = render(<ConnectedSkillsPage />)

  //After rendering change the spy value once as if we are deleting
  spy.mockReturnValueOnce({
    json() {
      return new Promise((resolve) => {
        // wrapping into setTimeout to ensure we don't trigger it immediately
        setTimeout(() =>
          resolve({})
        )
      }) 
    }
  })
  /**
   * We don't have a way to get specific Card base on id, so we just assume the list here.
   */
  const removeButtons = await findAllByTestId('delete-skill')
  //For the sake of simplicity we delete the second item on the list
  // delete the id `132` since it should be the second on the list
  fireEvent.click(removeButtons[1])
  // should be deleted
  expect(queryByText('132')).not.toBeInTheDocument()
  // twice getting items
  // deleting item
  expect(spy).toHaveBeenCalledTimes(2)
})

