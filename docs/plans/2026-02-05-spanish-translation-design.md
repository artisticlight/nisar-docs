# Spanish Translation Site Design

## Overview

Add a Spanish-language version of the NISAR Data User Guide, served at `/es/` alongside the existing English site at `/`. A header link on each site lets users switch between languages, landing on the same page in the other language.

## Architecture Decisions

| Aspect | Decision |
|---|---|
| **Hosting** | Subdirectory: English at `/`, Spanish at `/es/` |
| **Content management** | `spanish` branch mirrors `main` structure with translated `.md` files and `myst.yml` titles |
| **Deploy** | Single workflow builds both branches, combines output, deploys to GitHub Pages |
| **Language switcher** | Static header link via theme template override — "Español" on English, "English" on Spanish |
| **UI chrome** | Stays in English; only page content and navigation titles are translated |
| **Sync process** | Translator periodically merges `main` into `spanish`, resolves conflicts in `.md` files only |
| **Bibliography** | Shared, stays in English (references published English-language documents) |
| **Assets** | Shared, kept in sync via merge from `main` |

## Branch Structure

The `main` branch remains the English site, unchanged. A `spanish` branch is created from `main` with an identical directory structure. The Spanish translator works exclusively on the `spanish` branch.

The file structure on both branches is identical:

```
index.md
myst.yml
nisar-docs.bib
environment.yml
about-nisar/nisar-intro.md
data-products/products-overview.md
data-products/level-2/gcov.md
accessing-nisar/access-overview.md
... (same paths on both branches)
```

### What differs between branches

- **`.md` files**: Page content is translated to Spanish
- **`myst.yml`**: Navigation titles in the `toc` section are translated (e.g., "Data Products" becomes "Productos de Datos"), `logo_text` becomes "Guía de Datos de Usuario NISAR", and abbreviation expansions are translated
- **Language switcher snippet**: The `main` branch shows "Español" linking to `/es/`; the `spanish` branch shows "English" linking to `/`

### What stays the same between branches

- `nisar-docs.bib` — citations reference published English-language documents
- `assets/` — images and figures are language-independent
- `environment.yml` — build dependencies
- `.github/workflows/` — CI/CD configuration (managed on `main`, synced to `spanish`)
- Directory structure and file names

## Deploy Workflow

The existing `.github/workflows/deploy.yml` is modified to build both branches and combine them into a single GitHub Pages deployment.

Updated flow:

1. Check out `main` branch
2. Run `myst build --html`
3. Apply the existing `sed` localhost URL fix
4. Move output to a staging directory `_combined/`
5. Check out `spanish` branch
6. Run `myst build --html`
7. Apply the `sed` localhost URL fix
8. Move output to `_combined/es/`
9. Upload `_combined/` as the Pages artifact and deploy

The workflow triggers on pushes to both `main` and `spanish`, so updates to either language redeploy the full site.

The `BASE_URL` variable applies to both builds. The Spanish build needs its paths adjusted to account for the `/es/` prefix — either by setting `BASE_URL` to include `/es/` during the Spanish build step, or by adjusting paths post-build when copying into the staging directory.

### Trigger configuration

```yaml
on:
  push:
    branches:
      - main
      - spanish
```

## Language Switcher

MyST's book-theme does not have a native language toggle. We inject a language switcher link into the header using a theme template partial override.

### Mechanism

The book-theme allows overriding template partials by placing files in a `_templates/` directory at the project root. We add a header partial that includes a styled language link.

### Behavior

- On the English site (`main` branch): A link labeled "Español" appears in the header
- On the Spanish site (`spanish` branch): A link labeled "English" appears in the header
- Clicking the link swaps the URL prefix: if the user is on `/accessing-nisar/earthdata-search` and clicks "Español", they navigate to `/es/accessing-nisar/earthdata-search`
- If the user is on `/es/accessing-nisar/earthdata-search` and clicks "English", they navigate to `/accessing-nisar/earthdata-search`

### Implementation

A small JavaScript snippet handles the URL rewriting:

- **English site version**: reads `window.location.pathname`, prepends the `/es` prefix (accounting for `BASE_URL`), and sets that as the link `href`
- **Spanish site version**: reads `window.location.pathname`, strips the `/es` prefix, and sets that as the link `href`

The switcher is a static link styled to match the existing header navigation. No framework or runtime complexity.

## Setup Steps

1. **Create the `spanish` branch** from `main`
2. **Add the language switcher template override** to both branches (different content on each — "Español" vs. "English")
3. **Update `deploy.yml`** to build and combine both branches, triggered on pushes to both `main` and `spanish`
4. **On the `spanish` branch**, translate `myst.yml` navigation titles and `logo_text`
5. **Translator begins translating** `.md` page content on the `spanish` branch over time

## Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Structural changes on `main` break `spanish` branch | Translator periodically merges `main` into `spanish`; conflicts only occur in `.md` files where both branches changed |
| Spanish page doesn't exist yet when user clicks switcher | During the translation period, some links may land on untranslated (English) pages. This is acceptable as a transitional state. Alternatively, the `spanish` branch can keep English content for not-yet-translated pages. |
| Theme updates or MyST version changes break the template override | Pin MyST version in `environment.yml` (already done). Test template override after upgrades. |
| Deploy time increases with two builds | Minimal impact — MyST builds are fast for a documentation site of this size |
