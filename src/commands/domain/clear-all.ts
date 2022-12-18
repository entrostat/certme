import { BaseCommand } from '../../shared/base.command';
import { backupConfigFile } from '../../shared/backup-config-file';
import { CliUx, Flags } from '@oclif/core';

export default class DomainClearAll extends BaseCommand {
    static description = 'Removes all of the registered domains';

    static examples = ['<%= config.bin %> <%= command.id %>'];

    static flags = {
        force: Flags.boolean({
            char: 'f',
            description: 'Force the removal of the domains, do not ask for confirmation',
            default: false,
        }),
    };

    static args = [];

    public async run(): Promise<void> {
        this.log(`WARNING - We are about to clear all of your domains...`);
        const { flags } = await this.parse(DomainClearAll);
        if (!flags.force && !(await CliUx.ux.confirm(`Are you sure you want to clear the domains?`))) {
            this.error(`Confirmation not received`);
            this.exit(1);
        }
        const config = await this.getConfig();
        const backupPath = await backupConfigFile(config, await this.getConfigBackupPath());
        this.log(`Created a backup at: ${backupPath}`);
        config.domains = [];
        await this.saveConfig(config);
    }
}
