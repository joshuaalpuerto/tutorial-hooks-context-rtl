import { useEffect } from 'react'
import useApi from 'utils/useApi'

const URL = 'http://localhost:4000/skills'

const useGetSkillsApi  = () => {
  const [store, makeRequest] = useApi(URL)
  const { response, loader } = store
  const skills = response || []
  
  useEffect(() => {
    makeRequest()
  }, [makeRequest])

  return [skills, loader]
}

export {
  useGetSkillsApi
}