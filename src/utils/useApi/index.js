import { useReducer, useCallback } from 'react'
import request from 'utils/request'

import { FETCHING, SUCCESS, ERROR } from './constants';
import { fetching, success, error } from './actions';

const initialState = {
  response: null, // could be whatever type of response they are expecting
  loader: true,
  success: false,
  error: false
}

function apiReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING:
      return initialState;
    case SUCCESS:
      return {
        ...state,
        response: action.payload,
        loader: false,
        success: true,
        error: false
      };
    case ERROR:
      return {
        ...state,
        loader: false,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
}

/**
 * Be careful on setting `{}` this is not shallow copy and if 
 * passed as 2nd argument, it will lose equality and will trigger
 * re-render
 */
const useApiFetcher  = (url, options) => {
  const [state, dispatch] = useReducer(apiReducer, initialState)
  
  const makeRequest = useCallback(() => {
    (async () => {
      dispatch(fetching());
      try {
        const response = await request(url, options);
        dispatch(success(response));
      } catch (err) {
        dispatch(error(err));
      }
    })()
  }, [url, options])

  return [state, makeRequest]
}

export default useApiFetcher