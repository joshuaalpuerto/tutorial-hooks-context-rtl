import React from 'react'

import Select from 'components/Select'

import Experience from './Experience'
import { EXPERIENCES } from './constants'
import {
  ExperienceWrapper
} from './styled'

const SelectHandler = React.memo(({ value, onInputChange }) => {
  return (
    <ExperienceWrapper>
      <Select
        aria-label="experience"
        name="experience"
        onChange={onInputChange}
        value={value}
        required
      >
        <Experience
          id=""
          disabled
          label="Experience"
        />
        {EXPERIENCES.map(experience => (
          <Experience key={experience.id} {...experience} />
        ))}
      </Select>
    </ExperienceWrapper>
  )
})

export default SelectHandler