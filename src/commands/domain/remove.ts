import { Flags } from '@oclif/core';
import { BaseCommand } from '../../shared/base.command';
import { removeDomainFromNginx } from '../../shared/remove-domain-from-nginx';

export default class DomainRemove extends BaseCommand {
    static description = 'Remove a domain from the registered domains';

    static examples = ['<%= config.bin %> <%= command.id %>'];

    static flags = {
        domain: Flags.string({
            char: 'd',
            description: 'The domain that you would like to remove from the system',
            required: true,
        }),
    };

    static args = [];

    public async run(): Promise<void> {
        const { args, flags } = await this.parse(DomainRemove);

        this.log(`Removing the domain ${flags.domain}`);
        const config = await this.getConfig();
        const foundIndex = config.domains.findIndex((d) => d.domain === flags.domain);
        if (foundIndex > -1) {
            const found = config.domains[foundIndex];
            this.log(`Removing entry: 127.0.0.1:${found.port} ---> https://${found.domain} (uuid: ${found.uuid})`);
            config.domains = config.domains.filter((d) => d.domain !== flags.domain);
            await removeDomainFromNginx(found.domain);
            await this.saveConfig(config);
            return;
        }

        let count = 1;
        this.error(
            `Domain ${flags.domain} not found, your options are:\n\n${(config.domains || [])
                .map((d) => `    ${count++}. ${d.domain}`)
                .join('\n')}\n\n`,
        );
    }
}
