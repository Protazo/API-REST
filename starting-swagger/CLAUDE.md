# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an educational project demonstrating how to implement OpenAPI (Swagger) documentation. It uses Swagger UI to provide an interactive API documentation interface, currently configured for the Rick and Morty API as an example.

**Key components:**
- `openapi.yaml` - OpenAPI 3.0 specification defining the API
- `index.html` - HTML page that loads Swagger UI and points to openapi.yaml
- `swagger-ui-dist` (from node_modules) - Swagger UI static assets

## Development Commands

**Start development server:**
```bash
npm start
```
Starts http-server on port 8080 (default). Access the Swagger UI at http://localhost:8080

**Build for deployment:**
```bash
npm run build
```
Runs `build.js` which creates a `dist` folder with all static files needed for deployment:
- Cleans the dist directory (using rimraf)
- Copies index.html to dist/ and transforms paths from `./node_modules/swagger-ui-dist/` to `./swagger-ui-dist/`
- Copies openapi.yaml to dist/
- Copies swagger-ui-dist assets to dist/swagger-ui-dist/

**Install dependencies:**
```bash
npm install
```

## Architecture

This is a static documentation site with no backend server code:

1. **Swagger UI Integration**: index.html loads Swagger UI JavaScript bundle and points it to openapi.yaml via the `url` parameter
2. **OpenAPI Spec**: openapi.yaml defines the API structure using OpenAPI 3.0 format, including paths, operations, parameters, responses, and schemas
3. **Static Build**: Build process creates a self-contained dist folder suitable for static hosting (e.g., GitHub Pages)

## Working with OpenAPI Specifications

When modifying `openapi.yaml`:
- Update `info.title`, `info.description`, and `servers.url` to match the target API
- Define API endpoints under `paths`, specifying HTTP methods, parameters, and responses
- Define reusable data models in `components.schemas` and reference them using `$ref: '#/components/schemas/ModelName'`
- Follow OpenAPI 3.0 specification format

## Deployment

The project is designed for GitHub Pages deployment:
1. Run `npm run build` to generate static files
2. Deploy the `dist` folder to GitHub Pages using either:
   - `git subtree push --prefix dist origin gh-pages`
   - Or configure GitHub Pages to serve from dist folder on main branch
