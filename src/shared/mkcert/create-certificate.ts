import { Domain } from '../models/domain';
import { exec } from 'child_process';
import * as path from 'path';
import { getCertificateRoot } from './get-certificate-root';
import { getMkcertBinPath } from './get-mkcert-bin-path';

export async function createCertificate(domains: Domain[], user: string) {
    const caRoot = await getCertificateRoot(user);
    await new Promise(async (resolve, reject) => {
        exec(
            `sudo -H -u ${user} /bin/bash -c "${await getMkcertBinPath()} -cert-file ${path.join(caRoot, 'cert.pem')} -key-file ${path.join(
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
    await new Promise<void>(async (resolve, reject) => {
        exec(`sudo -H -u ${user} /bin/bash -c "${await getMkcertBinPath()} -uninstall"`, (err, stdout, stderr) => {
            if (err) {
                console.error(stderr);
                return reject(stderr);
            }
            console.log(stdout);
            resolve();
        });
    });
    await new Promise<void>(async (resolve, reject) => {
        exec(`sudo -H -u ${user} /bin/bash -c "${await getMkcertBinPath()} -install"`, (err, stdout, stderr) => {
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
