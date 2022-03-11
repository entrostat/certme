import { exec } from 'child_process';

export async function getCertificateRoot(user: string) {
    return await new Promise<string>((resolve, reject) => {
        exec(`sudo -H -u ${user} /bin/bash -c "mkcert -CAROOT"`, (err, stdout, stderr) => {
            if (err) {
                return reject(stderr);
            }
            return resolve(stdout.replace(/\s/g, ''));
        });
    });
}
