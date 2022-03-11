import * as path from 'path';

export function generateNginxConfPath(domain: string) {
    return path.join('/etc/nginx/conf.d', `${domain.replace(/[^A-Za-z0-9.]/g, '')}.conf`);
}
