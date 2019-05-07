import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { InputBorderStyle } from '../../global-styles.js'

const StyledInput = styled.input`
  ${/** sc-custom input */ InputBorderStyle};
`

function Input({ name, ...props }) {
  return <StyledInput name={name} {...props} />
}

Input.propTypes = {
  name: PropTypes.string.isRequired
}

export default Input
