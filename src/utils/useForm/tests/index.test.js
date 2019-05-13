import { renderHook, act } from 'react-hooks-testing-library'

import useForm, { INITIAL_STATE } from '../index'

test('Should update state onChange', () => {
  const { result } = renderHook(() => useForm())

  act(() => result.current.onChange({
    target: {
      name: 'name',
      value: 'React'
    }
  }))
  act(() => result.current.onChange({
    target: {
      name: 'experience',
      value: '< 1 year'
    }
  }))
  
  expect(result.current.values.name).toEqual('React')
  expect(result.current.values.experience).toEqual('< 1 year')
})

test('Should reset state on resetForm', () => {
  const { result } = renderHook(() => useForm())

  act(() => result.current.resetForm())

  expect(result.current.values).toEqual(INITIAL_STATE)
})

