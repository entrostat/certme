import { Domain } from './models/domain';
import * as fs from 'fs-extra';
import { backupHostsFile } from './backup-hosts-file';

export async function updateHostsFile(domain: Domain, backupPath: string) {
    const currentHostsFile = await fs.readFile('/etc/hosts').then((d) => d.toString());
    await backupHostsFile(currentHostsFile, backupPath);
}
