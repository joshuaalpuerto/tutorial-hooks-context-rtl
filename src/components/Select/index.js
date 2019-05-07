import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { InputBorderStyle } from '../../global-styles.js'

const StyledSelect = styled.select`
  height: 40px;
  ${/** sc-custom select */ InputBorderStyle};
`

function Select({ name, ...props }) {
  return <StyledSelect name={name} {...props} />
}

Select.propTypes = {
  name: PropTypes.string.isRequired
}

export default Select
