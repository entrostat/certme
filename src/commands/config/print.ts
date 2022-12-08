import {BaseCommand} from '../../shared/base.command'
import {table} from '@oclif/core/lib/cli-ux/styled/table'

export default class Print extends BaseCommand {
  static description = 'Prints the current config out'

  static examples = ['<%= config.bin %> <%= command.id %>']

  async run() {
    const config = await this.getConfig();
    this.log(`User: ${config.user}`);
    this.log(``);
    this.log(`Domains:`);
    let count = 0;
    config.domains.forEach(domain => this.log(`  ${++count}. http://localhost:${domain.port} ---> ${domain.domain}`))
  }

}
