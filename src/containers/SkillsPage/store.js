import React, { 
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback 
} from 'react'


const Context = createContext({})

export const INITIAL_STATE = {
  skills: [],
}

const useSkillStore = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Consumer should be wrapped inside the Provider')
  }

  return context
}

// Provider
const Provider = ({ children, initialState = INITIAL_STATE }) => {
  const [state, setState] = useState(initialState)

  const setSkills = useCallback((skills) => {
    setState({
      skills
    })
  }, [])
  // we only ensure that to recreate context once state is changed.
  const context = useMemo(() => ({
    state,
    setSkills
  }), [state, setSkills])

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}

export {
  Provider,
  useSkillStore,
}