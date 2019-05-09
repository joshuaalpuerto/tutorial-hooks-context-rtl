import React from 'react'
import PropTypes from 'prop-types'
import { IdWrapper, ContentWrapper, Remove, Wrapper } from './styled'

export const DEFAULT_COLOR = '#80878B'
/**
 * Make renderDelete available for them to customize or not to provide just for display
 * @param {*} param0
 */
function Card({ id, color, heading, subheading, renderDelete }) {
  const bgColor = color || DEFAULT_COLOR
  return (
    <Wrapper data-testid="wrapper">
      <IdWrapper data-testid="id" bgColor={bgColor}>{id}</IdWrapper>
      <ContentWrapper>
        {heading}
        {subheading && <span data-testid="subheading"> {subheading} </span>}
      </ContentWrapper>
      <Remove data-testid="remove">{renderDelete}</Remove>
    </Wrapper>
  )
}

Card.defaultProps = {
  color: DEFAULT_COLOR,
  // renderDelete: null
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  heading: PropTypes.string.isRequired,
  renderDelete: PropTypes.node,
  subheading: PropTypes.string,
  color: PropTypes.string
}

export default Card
