import { Domain } from '../models/domain';
import * as fs from 'fs-extra';
import { backupHostsFile } from './backup-hosts-file';

export async function removeDomainFromHostsFile(domain: Domain, backupPath: string) {
    const currentHostsFile = await fs.readFile('/etc/hosts').then((d) => d.toString());
    await backupHostsFile(currentHostsFile, backupPath);
    const lines = currentHostsFile.split('\n');
    const removeExisting = lines.filter((line) => line.indexOf(domain.uuid) === -1 && line.indexOf(domain.domain) === -1);
    const finalHostsFile = removeExisting.join('\n');
    await fs.writeFile('/etc/hosts', finalHostsFile);
}
