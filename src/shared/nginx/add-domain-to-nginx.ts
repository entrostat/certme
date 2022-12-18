import { Domain } from '../models/domain';
import * as fs from 'fs-extra';
import * as path from 'path';
import { exec } from 'child_process';
import { getCertificateRoot } from '../mkcert/get-certificate-root';
import { generateNginxConfPath } from './generate-nginx-conf-path';
import { executeCommand } from 'entro-version/dist/shared/execute-command';

export async function addDomainToNginx(domain: Domain, user: string) {
    const caRoot = await getCertificateRoot(user);
    const domainEntry = `
  server {
  listen 80;
	listen 443 ssl;

	server_name ${domain.domain} ${domain.uuid};
	ssl_certificate ${path.join(caRoot, 'cert.pem')};
  ssl_certificate_key ${path.join(caRoot, 'key.pem')};


	location / {
		proxy_pass http://127.0.0.1:${domain.port};
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Port $server_port;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_cache_bypass $http_upgrade;
    proxy_no_cache $http_pragma $http_authorization;
	}

	location /__local_https_route {
	  add_header Content-Type text/html;
	  return 200 '<html lang="en"><body><h1>https://${domain.domain} ---> 127.0.0.1:${domain.port}</h1></body></html>';
	}
}
`;
    await fs.writeFile(generateNginxConfPath(domain.domain), domainEntry);
    await executeCommand(`nginx -t`, console.log, console.error);
    return executeCommand(`systemctl restart nginx`, console.log, console.error);
}
