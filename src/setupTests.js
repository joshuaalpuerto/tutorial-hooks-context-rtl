
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'

/**
 * Issue about the warning and with our test `containers/SkillsPage/tests/index.test.js
 * https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256
 * 
 * TLDR:
 *  issue about warning of `act`
 */
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// -- end of snippet