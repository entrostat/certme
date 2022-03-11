import { BaseCommand } from '../../shared/base.command';
import * as fs from 'fs-extra';
import { backupConfigFile } from '../../shared/backup-config-file';

export default class DomainClearAll extends BaseCommand {
    static description = 'Removes all of the registered domains';

    static examples = ['<%= config.bin %> <%= command.id %>'];

    static flags = {};

    static args = [];

    public async run(): Promise<void> {
        this.log(`WARNING - We are about to clear all of your domains...`);
        const config = await this.getConfig();
        const backupPath = await backupConfigFile(config, await this.getConfigBackupPath());
        this.log(`Created a backup at: ${backupPath}`);
        config.domains = [];
        await this.saveConfig(config);
    }
}
