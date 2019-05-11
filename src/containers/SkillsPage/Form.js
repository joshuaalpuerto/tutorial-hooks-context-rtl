import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import useForm from 'utils/useForm'

import Button from 'components/Button'

import Input from './Input'
import Select from './Select'
import {
  ButtonWrapper,
  FormWrapper
} from './styled'

/* eslint-disable react/prefer-stateless-function */
const Form = ({ onSubmit }) => {
  const { values, onChange, resetForm } = useForm()

  const formSubmission = useCallback((evt) => {
    const { name, experience } = values
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
      resetForm()
    }
  }, [values, resetForm, onSubmit])

  return (
    <FormWrapper onSubmit={formSubmission}>  
      <Input value={values.name || ''} onInputChange={onChange} />
      <Select value={values.experience || ''} onInputChange={onChange} />
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
