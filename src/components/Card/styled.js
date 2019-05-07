import styled from 'styled-components'

export const DeleteButton = styled.span`
  &:after {
    color: #ccc;
    content: '\00d7';
    font-family: Arial, sans-serif;
    font-weight: 500;
    font-size: 24px;
    position: absolute;
    right: 10px;
    top: 5px;
    z-index: 1;
  }
`

export const IdWrapper = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
  padding: 5px;
`

export const ContentWrapper = styled.div`
  padding: 10px;
  padding-right: 80px;
  display: flex;
  flex-direction: column;

  & span {
    color: #ccc;
  }
`

export const Remove = styled.div`
  cursor: pointer;
  display: none;
`

export const Wrapper = styled.div`
  background-color: #fff;
  border: 2px solid #ccc;
  display: inline-flex;
  margin: 10px;
  padding: 0;
  position: relative;

  &:hover {
    ${/* sc-custom 'div' */ IdWrapper} {
      background-color: #1b998e;
    }
    ${/* sc-custom 'span' */ Remove} {
      display: block;
    }
  }

  @media only screen and (max-width: 768px) {
    display: flex;
    margin: 0;

    ${/* sc-custom 'span' */ Remove} {
      display: block;
    }
  }
`
