import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { always, gt, ifElse } from 'ramda'

import Card from 'components/Card'
import { DeleteButton } from 'components/Card/styled'


const SkillsWrapper = styled.div`
  background-color: #eee;
  min-height: 10vh;
`

const EmptySkills = styled.div`
  align-items: center;
  display: flex;
  height: 10vh;
  justify-content: center;
`

export const Empty = () => (
  <EmptySkills>
    No records
  </EmptySkills>
)
const colorIdentifier = ifElse(gt(5), always('#24333C'), always(null))
/* eslint-disable react/prefer-stateless-function */
const Skills = ({ skills, onDelete }) => (
  <SkillsWrapper>
    {skills.length === 0 ? (
      <Empty />
    ) : (
      skills.map(({ id, name, experience }, idx) => (
        <Card
          key={id}
          id={id}
          heading={name}
          subheading={experience}
          color={colorIdentifier(idx)}
          renderDelete={<DeleteButton onClick={() => onDelete(id)} />}
        />
      ))
    )}
  </SkillsWrapper>
)

Skills.propTypes = {
  skills: PropTypes.array,
  onDelete: PropTypes.func
}

export default Skills
