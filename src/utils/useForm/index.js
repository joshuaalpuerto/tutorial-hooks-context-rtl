import  { useReducer, useCallback } from 'react'

export const INITIAL_STATE = {}
function formReducer(state, action) {
  switch (action.type) {
    case '__reset__':
      return INITIAL_STATE
    case action.type:
      return {
        ...state,
        [action.type]: action.payload
      };
    default:
      return state;
  }
}

/* eslint-disable react/prefer-stateless-function */
const useForm = () => {
  const [ values, dispatch ] = useReducer(formReducer, INITIAL_STATE)

  const onChange = useCallback((evt) => {
    const { name: type, value: payload } = evt.target

    dispatch({ type, payload })
  },[])

  const resetForm = useCallback(() => {
    dispatch({ type: '__reset__' })
  },[])

  return {
    values,
    onChange,
    resetForm
  }
}

export default useForm
