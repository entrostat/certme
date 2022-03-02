import { Command, Flags } from '@oclif/core';
import { BaseCommand } from '../../shared/base.command';
import { v4 as uuid } from 'uuid';
import { addDomainToHostsFile } from '../../shared/add-domain-to-hosts-file';
import { Domain } from '../../shared/models/domain';

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
        this.log(`Registering new domain:`);
        this.log(`127.0.0.1:${flags.port} ---> https://${flags.domain}`);

        const config = await this.getConfig();
        const domain: Domain = {
            domain: flags.domain,
            port: flags.port,
            uuid: uuid().toString(),
        };
        config.domains.push(domain);
        await this.saveConfig(config);

        await addDomainToHostsFile(domain, await this.getHostsBackupPath());

        this.log(`Domain registered successfully`);
    }
}
