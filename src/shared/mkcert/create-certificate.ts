import { Domain } from '../models/domain';
import * as path from 'path';
import { getCertificateRoot } from './get-certificate-root';
import { getMkcertBinPath } from './get-mkcert-bin-path';
import { executeCommand } from 'entro-version/dist/shared/execute-command';

export async function createCertificate(domains: Domain[], user: string) {
    const caRoot = await getCertificateRoot(user);
    await executeCommand(
        `sudo -H -u ${user} /bin/bash -c "${await getMkcertBinPath()} -cert-file ${path.join(caRoot, 'cert.pem')} -key-file ${path.join(
            caRoot,
            'key.pem',
        )} -p12-file ${path.join(caRoot, 'p12')} ${domains.map((d) => `\"${d.domain}\"`).join(' ')}"`,
        () => {},
        console.error,
    );
    await executeCommand(`sudo -H -u ${user} /bin/bash -c "${await getMkcertBinPath()} -uninstall"`, () => {}, console.error);
    await executeCommand(`sudo -H -u ${user} /bin/bash -c "${await getMkcertBinPath()} -install"`, () => {}, console.error);
    return caRoot;
}
