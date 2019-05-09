import React, { createContext, useReducer } from 'react'

const STORE_PREFIX = `skills`

const State = createContext({})
/**
 * Why we need to separate this?
 * See component will always rerender every time the value
 * of provider is change. Now, if we have component that only 
 * wants to `dispatch` then those component will re-render once 
 * the `state` changes.
 */
const Dispatch = createContext({})

export const  GET_SKILLS = `${STORE_PREFIX}/GET_SKILLS`
export const  CREATE_SKILLS = `${STORE_PREFIX}/CREATE_SKILLS`
export const  DELETE_SKILLS = `${STORE_PREFIX}/DELETE_SKILLS`
export const  SUCCESS_SKILLS = `${STORE_PREFIX}/SUCCESS_SKILLS`
export const  ERROR_SKILLS = `${STORE_PREFIX}/ERROR_SKILLS`

export const INITIAL_STATE = {
  skills: [],
  skillsLoader: true,
  skillsSuccess: false,
  skillsError: false
}
export function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case GET_SKILLS:
    case CREATE_SKILLS:
    case DELETE_SKILLS:
      return {
        ...state,
        skillsLoader: true,
        skillsSuccess: false,
        skillsError: false
      }
    case SUCCESS_SKILLS:
      return {
        ...state,
        skills: action.payload,
        skillsLoader: false,
        skillsSuccess: true,
        skillsError: false
      }
    case ERROR_SKILLS:
      return {
        ...state,
        skillsLoader: false,
        skillsSuccess: false,
        skillsError: true
      }
    default:
      return state;
  }
}

// Provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  )
}

export {
  State,
  Dispatch,
  Provider
}