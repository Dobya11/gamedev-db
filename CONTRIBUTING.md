# How to contribute

If you want to contribute, there's 2 main ways to do that.

## 1. Adding new items to database

### Open `src/data/resources.json`

Use this template for a valid item entry. Keep `category`, `type`, `pricing`, and `commercialUse` values aligned with the IDs in the matching JSON files.

```json
{
  "id": "",
  "name": "",
  "url": "",
  "description": "",
  "category": "",
  "type": "",
  "tags": [],
  "pricing": "",
  "commercialUse": "yes"
}
```

## 2. Updating website

Website is built with vite.

```powershell
npm run:
  dev
    vite
  build
    tsc -b && vite build
  lint
    eslint .
  preview
    vite preview
  prettier
    prettier . -write
```
