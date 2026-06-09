const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');

// Clean dist directory
console.log('Cleaning dist directory...');
execSync('npx rimraf dist', { stdio: 'inherit' });

// Create dist directory
fs.mkdirSync('dist', { recursive: true });

// Read and parse OpenAPI YAML
console.log('Reading and parsing openapi.yaml...');
const openapiYaml = fs.readFileSync('openapi.yaml', 'utf8');
const openapiSpec = yaml.load(openapiYaml);
const openapiJson = JSON.stringify(openapiSpec, null, 2);

// Copy and modify index.html
console.log('Copying and modifying index.html...');
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/\.\/node_modules\/swagger-ui-dist\//g, './swagger-ui-dist/');

// Replace url with inline spec to avoid CORS issues when opening file:// directly
indexHtml = indexHtml.replace(
  /url:\s*"openapi\.yaml",/,
  `spec: ${openapiJson},`
);

fs.writeFileSync('dist/index.html', indexHtml);

// Copy swagger-ui-dist
console.log('Copying swagger-ui-dist...');
execSync('npx cpr node_modules/swagger-ui-dist dist/swagger-ui-dist', { stdio: 'inherit' });

console.log('Build completed successfully!');
