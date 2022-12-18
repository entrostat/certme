import { executeCommand } from 'entro-version/dist/shared/execute-command';

export async function getMkcertBinPath(): Promise<string> {
    return await executeCommand(
        `which mkcert`,
        () => {},
        () => {},
    );
}
