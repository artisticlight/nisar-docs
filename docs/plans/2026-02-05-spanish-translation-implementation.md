# Spanish Translation Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Set up the infrastructure for a Spanish-language version of the NISAR docs at `/es/`, with a language switcher in the header linking between English and Spanish versions of each page.

**Architecture:** A `spanish` branch mirrors `main` with translated content. The deploy workflow builds both branches and combines them into a single GitHub Pages deployment. A language switcher link is injected into the built HTML during the deploy step using `sed`, matching the existing localhost URL fix pattern.

**Tech Stack:** MyST v1.7.0, GitHub Actions, GitHub Pages, `sed` for post-build HTML injection

---

### Task 1: Create the `spanish` branch

**Files:**
- No files modified — branch operation only

**Step 1: Create the branch from main**

```bash
git checkout main
git checkout -b spanish
git push -u origin spanish
```

**Step 2: Verify the branch exists**

Run: `git branch -a | grep spanish`
Expected: `* spanish` and `remotes/origin/spanish`

**Step 3: Switch back to main**

```bash
git checkout main
```

---

### Task 2: Add language switcher CSS to `main` branch

The language switcher link will be injected into the HTML by `sed` during the deploy workflow (Task 4). But we need CSS to style it, which is done via MyST's supported `site.options.style` mechanism.

**Files:**
- Create: `language-switcher.css`
- Modify: `myst.yml`

**Step 1: Create the CSS file**

Create `language-switcher.css` in the project root:

```css
.lang-switcher {
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  border-color: rgb(168, 162, 158);
  color: rgb(41, 37, 36);
}

.lang-switcher:hover {
  border-color: rgb(59, 130, 246);
  color: rgb(59, 130, 246);
  text-decoration: none;
}

.dark .lang-switcher {
  border-color: rgb(255, 255, 255);
  color: rgb(255, 255, 255);
}

.dark .lang-switcher:hover {
  border-color: rgb(96, 165, 250);
  color: rgb(96, 165, 250);
}
```

**Step 2: Reference the CSS file in myst.yml**

Add `style: language-switcher.css` to the `site.options` section in `myst.yml`. The options block should become:

```yaml
site:
  template: book-theme
  options:
    favicon: favicon.ico
    logo_text: 'NISAR Data User Guide'
    analytics_google: G-F5XFWH0KYR
    style: language-switcher.css
```

**Step 3: Verify the CSS loads locally**

Run: `myst start`

Open the site in a browser. In browser dev tools, verify that `language-switcher.css` is loaded (check the Network tab or the `<head>` for a `<link>` tag pointing to the custom stylesheet).

**Step 4: Commit**

```bash
git add language-switcher.css myst.yml
git commit -m "Add language switcher CSS for i18n support"
```

---

### Task 3: Update deploy.yml to build both branches

The workflow needs to:
1. Build `main` (English)
2. Build `spanish` (Spanish)
3. Inject the language switcher link into both builds' HTML
4. Combine into `_combined/` (English at root, Spanish at `/es/`)
5. Deploy

**Files:**
- Modify: `.github/workflows/deploy.yml`

**Step 1: Write the updated deploy workflow**

Replace the contents of `.github/workflows/deploy.yml` with:

```yaml
name: MyST GitHub Pages Deploy

on:
  push:
    branches:
      - main
      - spanish

env:
  BASE_URL: ${{ vars.BASE_URL }}
  DOMAIN: ${{ vars.DOMAIN }}

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    defaults:
      run:
        shell: bash -l {0}
    steps:
      - uses: actions/configure-pages@v5

      - uses: mamba-org/setup-micromamba@v2
        with:
          environment-file: environment.yml

      # Build English site from main branch
      - uses: actions/checkout@v6
        with:
          ref: main

      - name: Build English site
        run: |
          myst build --html
          sed -i -e "s|http://localhost:3000|$DOMAIN$BASE_URL|g" $(grep -RIl "http://localhost:3000" ./_build/html) || true
          mkdir -p _combined
          cp -r _build/html/* _combined/

      # Inject "Español" switcher link into English HTML files
      - name: Inject language switcher into English site
        run: |
          find _combined -name '*.html' -exec sed -i \
            's|<button class="myst-theme-button theme|<a class="lang-switcher" id="lang-switch" href="">Español</a><script>document.getElementById("lang-switch").href=window.location.pathname.replace(/^(\/[^/]*)?/,"$BASE_URL/es")+window.location.search;</script><button class="myst-theme-button theme|g' \
            {} +

      # Build Spanish site from spanish branch
      - uses: actions/checkout@v6
        with:
          ref: spanish
          clean: false
          path: _spanish_src

      - name: Build Spanish site
        run: |
          cd _spanish_src
          myst build --html
          sed -i -e "s|http://localhost:3000|$DOMAIN$BASE_URL/es|g" $(grep -RIl "http://localhost:3000" ./_build/html) || true
          mkdir -p ../_combined/es
          cp -r _build/html/* ../_combined/es/

      # Inject "English" switcher link into Spanish HTML files
      - name: Inject language switcher into Spanish site
        run: |
          find _combined/es -name '*.html' -exec sed -i \
            's|<button class="myst-theme-button theme|<a class="lang-switcher" id="lang-switch" href="">English</a><script>document.getElementById("lang-switch").href=window.location.pathname.replace(/^(\/[^/]*)?\/es/,"$BASE_URL")+window.location.search;</script><button class="myst-theme-button theme|g' \
            {} +

      - uses: actions/upload-pages-artifact@v4
        with:
          path: './_combined'

      - id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Review the workflow logic**

Key points to verify:
- Triggers on both `main` and `spanish` branches
- Uses `actions/checkout@v6` twice — second time into `_spanish_src` with `clean: false` so the first build isn't wiped
- The `sed` for the language switcher targets the theme toggle button (`myst-theme-button theme`) as an injection point — this places the link just before the dark/light mode toggle in the nav bar
- The JavaScript in the injected snippet dynamically computes the equivalent URL in the other language by rewriting the path prefix
- The Spanish build uses `$DOMAIN$BASE_URL/es` for the localhost replacement so internal links resolve correctly under `/es/`
- The `|| true` after `grep` prevents failure if no localhost strings are found
- `environment.yml` is read from whichever checkout is active — both branches should have the same file

**Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "Update deploy workflow to build English and Spanish sites"
```

---

### Task 4: Prepare the `spanish` branch with translated myst.yml

Switch to the `spanish` branch and update `myst.yml` with translated navigation titles, logo text, and abbreviation expansions. The `.md` content stays in English for now — the translator will translate pages over time.

**Files:**
- Modify (on `spanish` branch): `myst.yml`

**Step 1: Switch to the spanish branch and merge main**

```bash
git checkout spanish
git merge main
```

This brings in the CSS file and updated myst.yml from Tasks 2-3.

**Step 2: Update myst.yml with Spanish translations**

Update the following in `myst.yml` on the `spanish` branch:

1. Change `logo_text` from `'NISAR Data User Guide'` to `'Guía de Datos de Usuario NISAR'`

2. Translate the `toc` section titles (only the `title:` values — leave `file:` paths unchanged):
   - "Geophysical Products (Level 3)" → "Productos Geofísicos (Nivel 3)"
   - "Geocoded Products (Level 2)" → "Productos Geocodificados (Nivel 2)"
   - "Range-Doppler Products (Level 1)" → "Productos Range-Doppler (Nivel 1)"
   - "Unfocused Raw Products (Level 0)" → "Productos Brutos Sin Enfocar (Nivel 0)"
   - "Documentation" → "Documentación"
   - "User Support" → "Soporte al Usuario"
   - "Appendices" → "Apéndices"

3. Translate abbreviation expansions:
   - `AWS: Amazon Web Services` → `AWS: Servicios Web de Amazon`
   - `DAAC: Distributed Active Archive Center` → `DAAC: Centro de Archivo Activo Distribuido`
   - `DEM: Digital Elevation Model` → `DEM: Modelo Digital de Elevación`
   - `EDC: Earthdata Cloud` → `EDC: Nube Earthdata`
   - `EDL: Earthdata Login` → `EDL: Inicio de Sesión Earthdata`
   - `ESDIS: Earth Science Data and Information System` → `ESDIS: Sistema de Datos e Información de Ciencias de la Tierra`
   - `GCOV: Geocoded Polarimetric Covariance` → `GCOV: Covarianza Polarimétrica Geocodificada`
   - `GOFF: Geocoded Pixel Offsets` → `GOFF: Desplazamientos de Píxeles Geocodificados`
   - `GSLC: Geocoded Single Look Complex` → `GSLC: Complejo de Vista Única Geocodificado`
   - `GUNW: Geocoded Unwrapped Interferogram` → `GUNW: Interferograma Geocodificado Desenvuelto`
   - `NISAR: NASA-ISRO Synthetic Aperture Radar` → `NISAR: Radar de Apertura Sintética NASA-ISRO`
   - `NRB: Normalized Radar Backscatter` → `NRB: Retrodispersión Radar Normalizada`
   - `RTC: Radiometric Terrain Correction; Radiometrically Terrain-Corrected` → `RTC: Corrección Radiométrica del Terreno`
   - `SAR: Synthetic Aperture Radar` → `SAR: Radar de Apertura Sintética`
   - `SNR: Signal-to-Noise Ratio` → `SNR: Relación Señal-Ruido`
   - `UTM: Universal Transverse Mercator` → `UTM: Transversa Universal de Mercator`
   - `RIFG: Range Doppler Wrapped Interferogram` → `RIFG: Interferograma Envuelto Range Doppler`
   - `ROFF: Range Doppler Pixel Offsets` → `ROFF: Desplazamientos de Píxeles Range Doppler`
   - `RRSD: Radar Raw Signal Data` → `RRSD: Datos de Señal Bruta de Radar`
   - `RSLC: Range Doppler Single Look Complex` → `RSLC: Complejo de Vista Única Range Doppler`
   - `RUNW: Range Doppler Unwrapped Interferogram` → `RUNW: Interferograma Desenvuelto Range Doppler`

**Step 3: Verify the build works**

Run: `myst build --html`
Expected: Build completes without errors. The site should look identical to the English version but with translated navigation titles in the sidebar.

**Step 4: Commit and push**

```bash
git add myst.yml
git commit -m "Translate myst.yml navigation titles and abbreviations to Spanish"
git push origin spanish
```

---

### Task 5: Verify the deployed site

This task verifies the full pipeline works end-to-end.

**Step 1: Check GitHub Actions**

Go to the repository's Actions tab. Verify that the deploy workflow ran successfully after the push to `spanish`.

**Step 2: Verify the English site**

Navigate to the production URL (root). Verify:
- The site renders correctly
- "Español" link appears in the header, to the left of the dark/light mode toggle
- Clicking "Español" navigates to `/es/` + the current page path

**Step 3: Verify the Spanish site**

Navigate to `/es/`. Verify:
- The site renders correctly
- Navigation titles in the sidebar are in Spanish
- Logo text reads "Guía de Datos de Usuario NISAR"
- "English" link appears in the header
- Clicking "English" navigates back to the English version of the current page
- Page content is still in English (expected — translation hasn't started yet)

**Step 4: Test same-page switching**

Navigate to a deep page like `/products-overview`. Click "Español". Verify you land on `/es/products-overview`. Click "English". Verify you return to `/products-overview`.

---

### Task 6: Commit the deploy workflow to the `spanish` branch

The `spanish` branch needs the updated `deploy.yml` too (for consistency when merging from `main`).

**Step 1: Merge main into spanish**

```bash
git checkout spanish
git merge main
```

This should bring in the updated `deploy.yml`. Resolve any conflicts (there should be none aside from `myst.yml` which was already changed).

**Step 2: Push**

```bash
git push origin spanish
```

**Step 3: Commit summary**

At this point, both branches have:
- `language-switcher.css` — styling for the switcher link
- `myst.yml` — with `style: language-switcher.css` (Spanish branch has translated titles/abbreviations)
- `.github/workflows/deploy.yml` — builds both branches and deploys combined site
