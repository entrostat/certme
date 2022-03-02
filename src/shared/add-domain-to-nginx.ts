import { Domain } from './models/domain';
import * as fs from 'fs-extra';
import * as path from 'path';
import { exec } from 'child_process';

export async function addDomainToNginx(domain: Domain) {
    const domainEntry = `
  server {
	listen 80;

	server_name ${domain.domain} ${domain.uuid};

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
	  return 200 '<html><body><h1>127.0.0.1:${domain.port} ---> https://${domain.domain}</h1></body></html>';
	}
}
`;
    await fs.writeFile(path.join('/etc/nginx/conf.d', `${domain.domain.replace(/[^A-Za-z0-9.]/g, '')}.conf`), domainEntry);
    return new Promise((resolve, reject) => {
        exec(`systemctl restart nginx`, (err, stdout, stderr) => {
            if (err) {
                return reject(stderr);
            }
            resolve(stdout);
        });
    });
}
