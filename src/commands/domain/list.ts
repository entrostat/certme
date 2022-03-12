import { BaseCommand } from '../../shared/base.command';
import { CliUx } from '@oclif/core';

export default class DomainList extends BaseCommand {
    static description = 'Lists the existing domains that have been registered';

    static examples = ['<%= config.bin %> <%= command.id %>'];

    static flags = {};

    static args = [];

    public async run(): Promise<void> {
        const config = await this.getConfig();

        CliUx.ux.table(
            config.domains
                .map((d) => ({
                    domain: `https://${d.domain}`,
                    port: d.port.toString(),
                }))
                .sort((a, b) => {
                    if (a === b) {
                        return 0;
                    }
                    return a < b ? -1 : 1;
                }),
            {
                domain: {
                    header: 'Domain',
                },
                port: {
                    header: 'Port',
                },
            },
            {
                printLine: this.log.bind(this),
            },
        );

        if (config.domains.length === 0) {
            this.log('No domains registered...');
        }
    }
}
