import styled from 'styled-components'

export const InputWrapper = styled.div`
  flex: 1 30%;
  display: flex; /* this will make the input inside respect the size of it's parent */
`

export const ExperienceWrapper = styled.div`
  flex: 1 20%;
  margin: 0px 20px;
`

export const ButtonWrapper = styled.div`
  flex: 1 15%;
`

export const FormWrapper = styled.form`
  display: flex;
  margin: 20px 0px;
  flex-flow: row wrap;
  justify-content: space-around;

  @media only screen and (max-width: 768px) {
    ${/* sc-custom 'h1' */ InputWrapper} {
      flex: 1 100%;
      margin-bottom: 20px;
    }

    ${/* sc-custom 'h2' */ ExperienceWrapper} {
      flex: 1 30%;
      margin: 0 20px 0 0;
    }

    ${/* sc-custom 'h3' */ ButtonWrapper} {
      flex: 1;
    }
  }
`