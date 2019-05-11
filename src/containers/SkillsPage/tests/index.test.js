import React from 'react'
import { render, act, waitForElement } from 'react-testing-library'

import ConnectedSkillsPage from '../index'


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
  const spy = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => ({
      json() {
        return new Promise((resolve) => {
          // wrapping into setTimeout to ensure we don't trigger it immediately
          setTimeout(() =>
            resolve([{
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
            }])
          )
        }) 
      }
    }))
  const { findByText } = render(<ConnectedSkillsPage />)
  const skillId = await findByText('138')

  expect(skillId).toBeInTheDocument()
  expect(spy).toHaveBeenCalledTimes(1)
})