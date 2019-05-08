import { useEffect } from 'react'
import useApi from 'utils/useApi'

const useGetSkillsApi  = ({ url }) => {
  const [store, makeRequest] = useApi(url)
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