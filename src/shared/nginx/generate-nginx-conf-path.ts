import * as path from 'path';
import { Config } from '../../config';

export function generateNginxConfPath(domain: string) {
    return path.join(Config.installedConfig.defaultNginxConfigPath, `${domain.replace(/[^A-Za-z0-9.]/g, '')}.conf`);
}
