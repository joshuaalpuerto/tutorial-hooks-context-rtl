import { useReducer, useState, useEffect } from 'react'
import { filter, propEq, complement } from 'ramda'

import useApi from 'utils/useApi'

const URL = 'http://localhost:4000/skills'

/**
 * Util simply filter the key-value pair as constraint and will filter it from the list
 */
const removeFromArray = ({ key, value }) =>
  filter(complement(propEq(key, value)))

export const INITIAL_STATE = []
export function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'INITIAL': 
      return action.payload
    case 'ADD':
      return [...state, action.payload]
    case 'REMOVE':
      return removeFromArray({ key: 'id', value: action.payload })(state)
    default:
      return state;
  }
}

const useSkillStore = () => {
  const [ skills, dispatch ] =  useReducer(reducer, INITIAL_STATE)
  const [ skillsLoader, setSkillsLoader ] = useState(true)
  const { response, apiLoading } = useGetSkillsApi()

  // initial request for loading skills
  useEffect(() => {
    dispatch({ type: 'INITIAL', payload: response })
    setSkillsLoader(apiLoading)
  }, [response, apiLoading])

  return {
    skills,
    skillsLoader
  }
}

function useGetSkillsApi() {
  const [store, makeRequest] = useApi(URL)
  const { response, loader } = store
  
  useEffect(() => {
    makeRequest()
  }, [makeRequest])

  return {
    response,
    apiLoading: loader
  }
}


export {
  useGetSkillsApi,
  useSkillStore
}