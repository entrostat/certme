import { Command } from '@oclif/core';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Config } from '../config';

export interface ApplicationConfig {
    domains: {
        domain: string;
        port: number;
    }[];
}

export abstract class BaseCommand extends Command {
    /**
     * Returns the stored config of domains
     */
    async getConfig(): Promise<ApplicationConfig> {
        await this.createConfigIfNotExists();
        return await fs.readJSON(await this.getConfigPath());
    }

    /**
     * Checks if a file exists in the config path
     */
    async checkConfigExists() {
        return fs.pathExists(await this.getConfigPath());
    }

    /**
     * Creates an empty file if there is not a file in the config path
     */
    async createConfigIfNotExists() {
        if (!(await this.checkConfigExists())) {
            const emptyConfig: ApplicationConfig = {
                domains: [],
            };
            await fs.writeJSON(await this.getConfigPath(), emptyConfig);
        }
    }

    /**
     * Returns the path to the config.json file which is used to store all the
     * registered domains on the system.
     */
    async getConfigPath() {
        try {
            const localConfig = await fs.readJSON(path.join(this.config.configDir, Config.installedConfig.configName));
            if (localConfig.configPath) {
                return path.join(localConfig.configPath, Config.installedConfig.configName);
            }
        } catch (e) {
            // Do nothing in this case
        }
        return path.join(Config.installedConfig.defaultConfigPath, Config.installedConfig.configName);
    }
}
