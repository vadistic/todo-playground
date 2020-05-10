import { Config as Base } from './config'

describe('config', () => {
  class Config extends Base {
    something = process.env.SOMETHING || 'default'
  }

  const config = new Config()

  test('works', () => {
    expect(config.node_env).toBe('test')
    expect(config.debug).toBe(false)

    config.load({ file: './.env' })

    expect(config.node_env).toBe('production')
    expect(config.debug).toBe(true)

    config.load({ file: './.env.test' })

    // references stil ok
    expect(config.node_env).toBe('test')
    expect(config.debug).toBe(false)
  })
})
