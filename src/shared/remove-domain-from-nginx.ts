import { generateNginxConfPath } from './generate-nginx-conf-path';
import * as fs from 'fs-extra';

export async function removeDomainFromNginx(domain: string) {
    const configPath = generateNginxConfPath(domain);
    await fs.rm(configPath);
}
