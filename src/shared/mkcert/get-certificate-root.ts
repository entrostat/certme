import { exec } from 'child_process';
import { getMkcertBinPath } from './get-mkcert-bin-path';

export async function getCertificateRoot(user: string) {
    return await new Promise<string>(async (resolve, reject) => {
        exec(`sudo -H -u ${user} /bin/bash -c "${await getMkcertBinPath()} -CAROOT"`, (err, stdout, stderr) => {
            if (err) {
                return reject(stderr);
            }
            return resolve(stdout.replace(/\s/g, ''));
        });
    });
}
