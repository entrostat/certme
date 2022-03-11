import * as fs from 'fs-extra';
import * as path from 'path';
import { Config } from '../config';

export async function backupConfigFile(config: any, backupPath: string) {
    await fs.mkdirp(backupPath);
    const backupFileName = path.join(backupPath, `${Config.installedConfig.configName}.${Date.now()}`);
    await fs.writeJSON(backupFileName, config);
    return backupFileName;
}
