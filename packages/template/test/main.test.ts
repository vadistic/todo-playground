import { hello } from '../src'

describe('main', () => {
  test('works', () => {
    const res = hello()

    expect(res).toBe('hello')
  })
})
