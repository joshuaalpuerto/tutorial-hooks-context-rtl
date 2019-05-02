import styled from 'styled-components'

const StyledButton = styled.button`
  -webkit-font-smoothing: antialiased;
  background-color: #34495e;
  border-radius: 5px;
  border: 1px solid #34495e;
  box-sizing: border-box;
  color: #fff;
  display: inline-block;
  font-weight: 500;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.1;
  }
`

export default StyledButton
