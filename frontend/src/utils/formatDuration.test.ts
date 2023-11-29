import formatDuration from './formatDuration'

describe('formatDuration', () => {
  test('returns "N/A" when duration is 0', () => {
    expect(formatDuration(0)).toBe('')
  })

  test('returns correct format when duration is less than 10', () => {
    expect(formatDuration(9)).toBe('00:09')
  })

  test('returns correct format when duration is between 10 and 60', () => {
    expect(formatDuration(30)).toBe('00:30')
  })

  test('returns correct format when duration is exactly 60 (1 minute)', () => {
    expect(formatDuration(60)).toBe('01:00')
  })

  test('returns correct format when duration is more than 60', () => {
    expect(formatDuration(90)).toBe('01:30')
  })

  test('returns correct format when duration is more than 600 (10 minutes)', () => {
    expect(formatDuration(660)).toBe('11:00')
  })
})
