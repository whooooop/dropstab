
# **DropstabAPI**

`DropstabAPI` is a TypeScript library for interacting with the **[Dropstab](https://dropstab.com)** API.  
It provides a convenient interface for managing portfolios and analyzing on-chain data with integrations for **Ethereum** and **Solana**.

---

## 📦 **Installation**

Once the package is published to **npm**, you can install it with the following command:

```bash
npm install dropstab-api
```

---

## 🚀 **Getting Started**

### **Usage Example:**

```typescript
import { DropstabAPI } from 'dropstab-api';

// Initialize the DropstabAPI instance
const api = new DropstabAPI('https://api2.icodrops.com');

(async () => {
  // Log in to the API
  await api.login('your_email@example.com', 'your_password');

  // Retrieve portfolio groups
  const portfolios = await api.portfolioService.getPortfolioGroups();
  console.log('Portfolios:', portfolios);
})();
```

---

## 🛠 **Available Methods**

### 📌 **Initialization:**

```typescript
const api = new DropstabAPI(baseURL: string);
```

| Parameter  | Type   | Description                 |
|------------|--------|-----------------------------|
| `baseURL`  | string | The base URL for Dropstab API |

---

### 📌 **AuthService Methods**

#### 🔐 **`login(email: string, password: string): Promise<void>`**

Authenticates the user and stores tokens in memory.

| Parameter   | Type   | Description           |
|-------------|--------|-----------------------|
| `email`     | string | User's email address   |
| `password`  | string | User's password        |

**Example:**

```typescript
await api.login('your_email@example.com', 'your_password');
```

---

### 📌 **PortfolioService Methods**

#### 📂 **`getPortfolioGroups(): Promise<PortfolioGroup[]>`**

Retrieves a list of portfolio groups.

**Example:**

```typescript
const portfolios = await api.portfolioService.getPortfolioGroups();
console.log(portfolios);
```

---

## 🛡 **License**

This project is licensed under the **MIT License**. See the **`LICENSE.md`** file for details.
