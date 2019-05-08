import React from 'react'
import PropTypes from 'prop-types'

const Experience = ({ id, label, ...props }) => (
  <option value={id} {...props}>
    {label}
  </option>
)

Experience.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string
}

export default Experience
