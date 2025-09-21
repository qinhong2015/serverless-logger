import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function shortSha(): string {
    try {
        return execSync('git rev-parse --short HEAD').toString().trim();
    } catch (e) {
        console.error('Unable to read git sha, falling back to timestamp');
        return Date.now().toString(36).slice(-7);
    }
}

const root = path.resolve(__dirname);
const pkgPath = path.join(root, 'package.json');
console.log('Reading package.json from', pkgPath);
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { version: string } & Record<string, any>;

const base = pkg.version.split('-')[0];
const sha = shortSha();
const newVersion = `${base}-beta.${sha}`;

pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('Updated package.json version to', newVersion);

process.exit(0);
