import React, { useReducer, useCallback } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'

import Input from './Input'
import Select from './Select'
import {
  ButtonWrapper,
  FormWrapper
} from './styled'

const initialState = {
  name: '',
  experience: ''
}

function formReducer(state, action) {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        'name': action.payload
      };
    case 'experience':
      return {
        ...state,
        'experience': action.payload
      };
    case 'reset': 
      return initialState
    default:
      return state;
  }
}

/* eslint-disable react/prefer-stateless-function */
const Form = ({ onSubmit }) => {
  const [ forms, dispatch ] = useReducer(formReducer, initialState)
  const { name, experience } = forms

  const onInputChange = useCallback((evt) => {
    const { name: type, value: payload } = evt.target

    dispatch({ type, payload })
  },[])

  const formSubmission = useCallback((evt) => {
    evt.preventDefault()
    /**
     * Tho we have validation by our browser by default.
     * This is still trigger in test since we are running on node.
     * This will also add security
     */
    if (name && experience) {
      onSubmit({
        name, experience
      })
  
      //reset form
      dispatch({ type: 'reset' })
    }
  }, [name, experience, onSubmit])

  return (
    <FormWrapper onSubmit={formSubmission}>  
      <Input value={name} onInputChange={onInputChange} />
      <Select value={experience} onInputChange={onInputChange} />
      <ButtonWrapper>
        <Button>
          Submit
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Form
