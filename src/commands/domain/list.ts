import { Command, Flags } from '@oclif/core';
import { BaseCommand } from '../../shared/base.command';

export default class DomainList extends BaseCommand {
    static description = 'Lists the existing domains that have been registered';

    static examples = ['<%= config.bin %> <%= command.id %>'];

    static flags = {};

    static args = [];

    public async run(): Promise<void> {
        const { args, flags } = await this.parse(DomainList);
        const config = await this.getConfig();
        config.domains.forEach((domain) => {
            this.log(`127.0.0.1:${domain.port} ---> https://${domain.domain}`);
        });

        if (config.domains.length === 0) {
            this.log('No domains registered...');
        }
    }
}
