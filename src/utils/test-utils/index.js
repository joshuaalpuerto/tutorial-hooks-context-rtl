

export const spyJestFetch = (value) => {
  const spyFetch = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => ({
      json() {
        return value
      }
    }))

  return spyFetch
}
