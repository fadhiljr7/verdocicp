# 📄 HashWarden: Verifiable Document Registry on Internet Computer

HashWarden is a scalable dApp for **tamper-proof document verification** using the **Internet Computer Protocol (ICP)**. This system allows users to submit, validate, and audit authentic document securely, with features for verifier access control, frontend integration, and backend management.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hashwarden.git
cd hashwarden
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run local development

```bash
npm run dev
```

### 4. Deploy Canister (ICP Backend)

Make sure you have [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) installed:
raplace canister id on /src/backend_id.js

```bash
dfx start --background
dfx deploy
```

---

## ✨ Features

* 🔒 SHA-256 hashing & submission to ICP canister
* ✅ Verifier whitelisting & audit logging
* 🌐 Modern React + Tailwind + Framer Motion frontend
* 📦 Modular & scalable design
* 🛡️ Authenticated access for managing verifiers and credentials

---

## 📁 Deployment Notes

* The `public/_redirects` file ensures routing works properly on static hosting (like Netlify).
* Ensure ICP identity management (`LoginGate.jsx`) is integrated with Internet Identity.

---

## 📃 License

MIT License © 2025 HashWarden Team

---

> Built with ❤️ on the Internet Computer
