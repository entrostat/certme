import { Command, Flags } from '@oclif/core';
import { BaseCommand } from '../../shared/base.command';

export default class UserRegister extends BaseCommand {
    static description = 'Register a user that is on the system so that we can edit the trust servers for their account';

    static examples = ['<%= config.bin %> <%= command.id %>'];

    static flags = {};

    static args = [{ name: 'user', required: true, description: 'The username for the account using the browser (eg. run "whoami")' }];

    public async run(): Promise<void> {
        const { args, flags } = await this.parse(UserRegister);
        this.log(`Registering user ${args.user} on the system`);
        const config = await this.getConfig();
        config.user = args.user;
        await this.saveConfig(config);
    }
}
