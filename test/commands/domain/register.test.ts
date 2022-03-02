import {expect, test} from '@oclif/test'

describe('domain:register', () => {
  test
  .stdout()
  .command(['domain:register'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['domain:register', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
