import {expect, test} from '@oclif/test'

describe('domain:remove', () => {
  test
  .stdout()
  .command(['domain:remove'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['domain:remove', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
