import * as fs from 'fs-extra';
import * as path from 'path';

export async function backupHostsFile(hosts: string, backupPath: string) {
    await fs.mkdirp(backupPath);
    await fs.writeFile(path.join(backupPath, `hosts.${Date.now()}`), hosts);
}
