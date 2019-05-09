import { useContext, useEffect, useRef } from 'react'

import useApi from 'utils/useApi'

import { State, Dispatch, SUCCESS_SKILLS } from './store'

const URL = 'http://localhost:4000/skills'

function useGetSkillsApi() {
  const [store, makeRequest] = useApi()
  const dispatch = useContext(Dispatch)

  const { response } = store

  useEffect(() => {
    makeRequest(URL)
  }, [makeRequest])

  // Once data is available then return
  useEffect(() => {
    if (response) {
      dispatch({ type: SUCCESS_SKILLS, payload: response })
    }
  }, [response, dispatch])

 return null
}

/**
 * We make our handler as useRef since this is react way to store reference for shallow equality
 * we can define this also as an object but it should be outside in the function
 */
function usePostSkillsApi() {
  const currentSkill = useRef(null)

  const dispatch = useContext(Dispatch)
  const { skills } = useContext(State)

  const [store, makeRequest] = useApi()
  const { response } = store
  
  // We need to save the current skill so we won't end up causing infinite loop
  // tho this will trigger always on re-render
  // It won't cause the next `useEffect` to trigger infinitely since it's checking the shallow copy
  // of currentSkill `useRef(null)` tho the property is updated.
  useEffect(() => {
    currentSkill.current = skills
  }) 

  useEffect(() => {
    if (response) {
      dispatch({ type: SUCCESS_SKILLS, payload: [...currentSkill.current, response] })
    }
  }, [response, dispatch])

  return {
    createSkill: (value) => makeRequest(URL,{
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export {
  useGetSkillsApi,
  usePostSkillsApi
}