import { Command, Flags } from '@oclif/core';
import { BaseCommand } from '../../shared/base.command';

export default class DomainRegister extends BaseCommand {
    static description = 'Registers a new domain, creates the certificate, nginx config update and a change in the hosts file.';

    static examples = ['<%= config.bin %> <%= command.id %>'];

    static flags = {
        domain: Flags.string({
            char: 'd',
            description: 'The domain that you would like to add to the system',
            required: true,
        }),
        port: Flags.integer({
            char: 'p',
            description: 'The port that this will be running on on your local machine',
            default: 80,
        }),
    };

    static args = [];

    public async run(): Promise<void> {
        const { args, flags } = await this.parse(DomainRegister);
    }
}
