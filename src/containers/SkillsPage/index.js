import React from 'react'
import styled from 'styled-components'

import LoadingIndicator from 'components/LoadingIndicator'

import Form from './Form'
import Skills from './Skills'
import { useGetSkillsApi } from './useSkillsApi'

const Wrapper = styled.section`
  margin: 20px 0;
`

const URL = 'http://localhost:4000/skills'
const  SkillsPage = () => {
  const [ skills, skillsLoader ] = useGetSkillsApi({ 
    url: URL
  })
  return (
    <Wrapper>
      <h3>
        Add skills
      </h3>
      <Form onSubmit={() => {}} />
      {
        skillsLoader ?
        <LoadingIndicator/> :
        <Skills 
          skills={skills}
          onDelete={() => {}}
        />
      }
    </Wrapper>
  )
}

SkillsPage.propTypes = {}

export default SkillsPage
