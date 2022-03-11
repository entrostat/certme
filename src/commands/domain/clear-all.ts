import { Command, Flags } from '@oclif/core';
import { BaseCommand } from '../../shared/base.command';
import * as fs from 'fs-extra';

export default class DomainClearAll extends BaseCommand {
    static description = 'Removes all of the registered domains';

    static examples = ['<%= config.bin %> <%= command.id %>'];

    static flags = {};

    static args = [];

    public async run(): Promise<void> {
        const { args, flags } = await this.parse(DomainClearAll);

        this.log(`WARNING - We are about to clear all of your domains...`);
        const config = await this.getConfig();
        const backupPath = `${await this.getConfigPath()}.${Date.now()}`;
        await fs.writeJSON(backupPath, config);
        this.log(`Created a backup at: ${backupPath}`);
        config.domains = [];
        await this.saveConfig(config);
    }
}
