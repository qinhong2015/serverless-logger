const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pkgPath = path.join(root, 'package.json');
const distPkgPath = path.join(root, 'dist', 'package.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const distPkg = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    main: pkg.main || 'handler.js',
    license: pkg.license || 'MIT',
    dependencies: pkg.dependencies || {},
    publishConfig: pkg.publishConfig || undefined,
};

fs.writeFileSync(distPkgPath, JSON.stringify(distPkg, null, 2));
console.log('Wrote', distPkgPath);
