import React, { Children } from 'react'
import PropTypes from 'prop-types'

import StyledButton from './StyledButton'

function Button({ onClick, children, ...props }) {
  return (
    <StyledButton onClick={onClick} {...props}>
      {Children.toArray(children)}
    </StyledButton>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default Button
