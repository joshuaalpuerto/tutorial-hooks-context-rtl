import React, { useContext } from 'react'
import styled from 'styled-components'

import LoadingIndicator from 'components/LoadingIndicator'

import Form from './Form'
import Skills from './Skills'
import { Provider as  SkillsProvider, State } from './store'
import { useGetSkillsApi,  usePostSkillsApi, useDeleteSkillsApi } from './api'

const Wrapper = styled.section`
  margin: 20px 0;
`


const  SkillsPage = () => {
  const { skills, skillsLoader } = useContext(State)
  const { createSkill } = usePostSkillsApi()
  const { deleteSkill }  = useDeleteSkillsApi()

  useGetSkillsApi()

  return (
    <Wrapper>
      <h3>
        Add skills
      </h3>
      <Form onSubmit={createSkill} />
      {
        skillsLoader ?
        <LoadingIndicator/> :
        <Skills 
          skills={skills}
          onDelete={deleteSkill}
        />
      }
    </Wrapper>
  )
}

const ConnectedSkillsPage = () =>(
  <SkillsProvider>
    <SkillsPage />
  </SkillsProvider>
)

export default ConnectedSkillsPage
