
import React from 'react'
import { renderHook, act } from 'react-hooks-testing-library'
import { Provider, useSkillStore, INITIAL_STATE } from '../store'
import { useGetSkillsApi, usePostSkillsApi, useDeleteSkillsApi } from '../api'

afterEach(() => {
  // clear all mocks every after test so it has pristine state when use again.
  jest.resetAllMocks()
})

test('Should ensure that store is populated once API is requested', async() => {
  let store
  const spyFetch = jest
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

  const { result, waitForNextUpdate, rerender  } = renderHook(() => {
    store = useSkillStore()
    return  useGetSkillsApi()
  } , { wrapper: Provider })
  //fetch skills
  act(() => {
    result.current.fetchSkills()
  })

  await waitForNextUpdate()
  
  /**
   * Since we are not in a browser, update doesn't work here. 
   * Remember we are not using React this is just a custom hooks with regular javascript function. 
   * So we need to re-rerender it manually to get the updated value
   **/
  rerender()

  expect(spyFetch).toHaveBeenCalledTimes(1)
  expect(store.skills).toEqual([{
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
  const spyFetch = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => ({
      json() {
        return payload
      }
    }))

  const { result, waitForNextUpdate, rerender  } = renderHook(() => {
    store = useSkillStore()
    return  usePostSkillsApi()
  } , { wrapper: Provider })
  //post skills
  act(() => {
    result.current.createSkill(payload)
  })

  await waitForNextUpdate()

  rerender()

  expect(spyFetch).toHaveBeenCalledTimes(1)
  expect(store.skills).toEqual([payload])
})


test('Should delete skill #131 to the store', async() => {
  let store
  jest
  .spyOn(global, 'fetch')
  .mockImplementation(() => ({
    json() {
      return 
    }
  }))

  const { result, waitForNextUpdate, rerender  } = renderHook(() => {
    store = useSkillStore()
    return  useDeleteSkillsApi()
  } , {
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
  //delete skills
  act(() => {
    result.current.deleteSkill(131)
  })

  await waitForNextUpdate()

  rerender()

  expect(store.skills.length).toEqual(1)
})