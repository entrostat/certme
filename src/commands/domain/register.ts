import { Flags } from '@oclif/core';
import { BaseCommand } from '../../shared/base.command';
import { v4 as uuid } from 'uuid';
import { addDomainToHostsFile } from '../../shared/hosts/add-domain-to-hosts-file';
import { Domain } from '../../shared/models/domain';
import { addDomainToNginx } from '../../shared/nginx/add-domain-to-nginx';
import { createCertificate } from '../../shared/mkcert/create-certificate';

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

        this.debug(`Pulling config file`);
        const config = await this.getConfig();
        this.debug(`Retrieved config file with value:`);
        this.debug(JSON.stringify(config));

        const domainExists = config.domains.some((d) => d.domain === flags.domain && d.port === flags.port);

        if (domainExists) {
            this.error(`The domain ${flags.domain} and port ${flags.port} is already registered...`);
        }

        const domain: Domain = {
            domain: flags.domain,
            port: flags.port,
            uuid: uuid().toString() as string,
        };
        config.domains.push(domain);

        try {
            this.debug(`Saving config...`);
            this.debug(JSON.stringify(config));
            await this.saveConfig(config);
            this.debug(`Config saved...`);

            this.debug(`Adding domain to hosts file...`);
            await addDomainToHostsFile(domain, await this.getHostsBackupPath());
            this.debug(`Added domain to hosts file...`);
            this.debug(`Creating the certificate...`);
            await createCertificate(config.domains, config.user);
            this.debug(`Created certificate successfully...`);
            this.debug(`Adding the nginx config file...`);
            await addDomainToNginx(domain, config.user);
            this.debug(`Added the nginx config file successfully...`);

            this.log(`Domain ${flags.domain} registered successfully`);
        } catch (e: any) {
            this.error(`An error has occurred: ${e.message}. ${JSON.stringify(e)}`);
        }
    }
}
