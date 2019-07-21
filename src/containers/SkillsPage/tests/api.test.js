
import React from 'react'
import { renderHook, act } from 'react-hooks-testing-library'

import { spyJestFetch } from 'utils/test-utils'

import { Provider, useSkillStore, INITIAL_STATE } from '../store'
import { useGetSkillsApi, usePostSkillsApi, useDeleteSkillsApi } from '../api'

afterEach(() => {
  // clear all mocks every after test so it has pristine state when use again.
  jest.resetAllMocks()
})

const rerenderHookUseApi = (callback, options) => async (method, ...args) => {
  const { result, waitForNextUpdate, rerender  } = renderHook(callback, options)

  //trigger action
  act(() => {
    result.current[method](...args)
  })
  // wait since we are fetching for the items.(side effect update)
  await waitForNextUpdate()

  /**
   * Since we are not in a browser, update doesn't work here. 
   * Remember we are not using React this is just a custom hooks with regular javascript function. 
   * So we need to re-rerender it manually to get the updated value
   **/
  rerender()

  return {
    result
  }
}

test('Should ensure that store is populated once API is requested', async() => {
  let store
  const spyFetch = spyJestFetch([{
    "id": 131,
    "name": "GraphQL",
    "experience": "< 1 Year"
  },  {
    "id": 132,
    "name": "GraphQL",
    "experience": "< 1 Year"
  }])

  const render = rerenderHookUseApi(() => {
    store = useSkillStore()
    return  useGetSkillsApi()
  } , { wrapper: Provider })

  //method we have from `useGetSkillsApi`
  await render('fetchSkills');

  expect(spyFetch).toHaveBeenCalledTimes(1)
  expect(store.state.skills).toEqual([{
    "id": 131,
    "name": "GraphQL",
    "experience": "< 1 Year"
  },  {
    "id": 132,
    "name": "GraphQL",
    "experience": "< 1 Year"
  }])
})

test('Should add skill to the store', async() => {
  let store
  const payload = {
    "id": 131,
    "name": "GraphQL",
    "experience": "< 1 Year"
  }
  const spyFetch = spyJestFetch(payload)

  const render = rerenderHookUseApi(() => {
    store = useSkillStore()
    return  usePostSkillsApi()
  } , { wrapper: Provider })

  //method we have from `usePostSkillsApi`
  await render('createSkill', payload);

  expect(spyFetch).toHaveBeenCalledTimes(1)
  expect(store.state.skills).toEqual([payload])
})


test('Should delete skill #131 to the store', async() => {
  let store

  const spyFetch = spyJestFetch({})

  const render = rerenderHookUseApi(() => {
    store = useSkillStore()
    return  useDeleteSkillsApi()
  }, {
    wrapper: (props) => 
      <Provider {...{...props, initialState: {
        ...INITIAL_STATE,
        skills: [{
          "id": 131,
          "name": "GraphQL",
          "experience": "< 1 Year"
        },  {
          "id": 132,
          "name": "GraphQL",
          "experience": "< 1 Year"
        }]
      }}}/> 
  })

  //method we have from `useDeleteSkillsApi`
  await render('deleteSkill', 131);

  expect(spyFetch).toHaveBeenCalledTimes(1)
  expect(store.state.skills.length).toEqual(1)
})