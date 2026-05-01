# Split Transfers — web

Statična React SPA u **korijenu repozitorija** (`index.html`, `assets/`, `vercel.json`).

## GitHub

Repozitorij: [nikolaus22345/split-transfers.eu](https://github.com/nikolaus22345/split-transfers.eu)

```bash
git remote add origin https://github.com/nikolaus22345/split-transfers.eu.git
git branch -M main
git push -u origin main
```

## Vercel

1. [Vercel Dashboard](https://vercel.com/new) → **Import** → odaberi repo **split-transfers.eu**.
2. **Root Directory:** `.` (korijen — tamo je `index.html`).
3. **Framework Preset:** **Other** (ili “Static”).
4. **Build Command:** prazno (nema npm builda u ovom deployu).
5. **Output Directory:** prazno (korijen).
6. Deploy.

`vercel.json` šalje client-side rute na `index.html`, a **`/api/*`** ostaje za serverless funkcije.

### Environment varijable (preporuka)

| Varijabla | Opis |
|-----------|------|
| `WEB3FORMS_ACCESS_KEY` | Isti ključ kao u `index.html` — **obavezno** ako koristiš serverless rutu `api/send-form.js`. |
| `SITE_URL` | Kanonski URL deploya, npr. `https://split-transfers.eu` ili Vercel URL — za Web3Forms `Origin`/`Referer` iz API-ja. |

Forme u bundlu već mogu slati iz **preglednika** na Web3Forms (ključ u `index.html`); `/api/send-form` je opcijski backend ako ga app poziva.

### Lokalno (opcija)

```bash
npx vercel
```

## Ostalo u repou

- `*.php`, `elementor-*.html` — reference za WordPress / Elementor, ne izvršavaju se na Vercelu.
- `scripts/` — pomoćni Node skriptovi za održavanje sadržaja u bundlu.
