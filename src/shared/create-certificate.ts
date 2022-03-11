import { Domain } from './models/domain';
import { exec } from 'child_process';
import * as path from 'path';
import { getCertificateRoot } from './get-certificate-root';

export async function createCertificate(domains: Domain[], user: string) {
    const caRoot = await getCertificateRoot(user);
    await new Promise((resolve, reject) => {
        exec(
            `sudo -H -u ${user} /bin/bash -c "mkcert -cert-file ${path.join(caRoot, 'cert.pem')} -key-file ${path.join(
                caRoot,
                'key.pem',
            )} -p12-file ${path.join(caRoot, 'p12')} ${domains.map((d) => `\"${d.domain}\"`).join(' ')}"`,
            (err, stdout, stderr) => {
                if (err) {
                    console.error(stderr);
                    return reject(stderr);
                }
                console.log(stdout);
                return resolve(stdout);
            },
        );
    });
    await new Promise<void>((resolve, reject) => {
        exec(`sudo -H -u ${user} /bin/bash -c "mkcert -uninstall"`, (err, stdout, stderr) => {
            if (err) {
                console.error(stderr);
                return reject(stderr);
            }
            console.log(stdout);
            resolve();
        });
    });
    await new Promise<void>((resolve, reject) => {
        exec(`sudo -H -u ${user} /bin/bash -c "mkcert -install"`, (err, stdout, stderr) => {
            if (err) {
                console.error(stderr);
                return reject(stderr);
            }
            console.log(stdout);
            resolve();
        });
    });
    return caRoot;
}
