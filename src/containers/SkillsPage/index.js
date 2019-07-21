import React, { useEffect } from 'react'
import styled from 'styled-components'

import LoadingIndicator from 'components/LoadingIndicator'

import Form from './Form'
import Skills from './SkillsSuspense'
import { Provider as  SkillsProvider, useSkillStore } from './store'
import {
  useGetSkillsApi,
  usePostSkillsApi,
  useDeleteSkillsApi 
} from './api'

const Wrapper = styled.section`
  margin: 20px 0;
`


const  SkillsPage = () => {
  const { state } = useSkillStore()
  const { fetchSkills, fetchSkillsLoader } = useGetSkillsApi()
  const { skills } = state
  const { createSkill } = usePostSkillsApi()
  const { deleteSkill }  = useDeleteSkillsApi()
  
  useEffect(() => {
    fetchSkills()
  }, [fetchSkills])
  
  return (
    <Wrapper>
      <h3>
        Add skills
      </h3>
      <Form onSubmit={createSkill} />
      {
        fetchSkillsLoader ?
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
