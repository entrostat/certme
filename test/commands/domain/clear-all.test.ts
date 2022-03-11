import {expect, test} from '@oclif/test'

describe('domain:clear-all', () => {
  test
  .stdout()
  .command(['domain:clear-all'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['domain:clear-all', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
