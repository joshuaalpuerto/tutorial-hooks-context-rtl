import styled from 'styled-components'

export const DeleteButton = styled.span`
  position: absolute;
  right: 10px;
  top: 5px;
  width: 24px;
  height: 24px;
  opacity: 0.3;

  & :hover {
  opacity: 1;
  }

  &:before, &:after {
    position: absolute;
    left: 20px;
    content: ' ';
    height: 18px;
    width: 2px;
    background-color: #333;
  }

  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
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
