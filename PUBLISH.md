# 📦 How to Publish dropstab-api to npm

Follow the steps below to publish the `dropstab-api` package to **npm**.

---

## ✅ 1. Create an npm Account
If you don't have an npm account, create one at [https://www.npmjs.com/signup](https://www.npmjs.com/signup).

Then log in to npm from your terminal:
```bash
npm login
```

## 🛠 2.  Update package.json
Ensure package.json file is correctly configured:
- version: Use Semantic Versioning (e.g., 1.0.0).
```bash
npm version patch
```

## 📦 3. Build Package
Before publishing, ensure package is built and ready for production:
```bash
npm run prepublish
```

## 🚀 5. Publish to npm
Run the following command to publish package:
```bash
npm run publish
```
