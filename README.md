# PayFast External Authentication Server (for GHL App)

This is a simple Express.js backend to support **PayFast direct API integration** into the **GoHighLevel (GHL) App Marketplace**. It allows external authentication of merchant credentials before processing transactions directly inside GHL order forms or invoices.

---

## 🚀 Features

* Validates **Merchant ID** and **Secured Key** from PayFast (via their token endpoint)
* Sends **access token** if credentials are valid
* Includes placeholder `/webhook` for PayFast response callbacks
* Returns `401` if credentials fail

---

## 🔧 Tech Stack

* Node.js + Express
* Axios (for outbound API calls)
* Dotenv (for environment config)
* CORS (optional)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/payfast-auth-server.git
cd payfast-auth-server
npm install
```

Create a `.env` file:

```env
PORT=3000
```

---

## 🔑 API Endpoints

### `POST /auth`

**Purpose:** Validate merchant credentials and return token.

#### Request Body (JSON):

```json
{
  "merchant_id": "26290",
  "secured_key": "YOUR_SECURED_KEY",
  "txn_amount": "1000",
  "basket_id": "ORDER123"
}
```

#### Response (on success):

```json
{
  "access_token": "abc123xyz..."
}
```

#### Response (on error):

```json
{
  "error": "Authentication failed"
}
```

---

### `POST /webhook`

You can use this endpoint to receive transaction status updates from PayFast (optional).

---

## 🌍 Deploy

Deploy on **Railway** or any Node.js-supported environment.

For Railway:

* Push this code to GitHub
* Connect repo to Railway
* Set `PORT=3000` in environment variables
* Map custom domain `payment.10xcollab.com` to Railway URL

---

## 📌 Usage in GHL Marketplace

### In App Settings:

* External Auth URL:

```
https://payment.10xcollab.com/auth
```

* Auth Method: `POST`
* Body:

```json
{
  "merchant_id": "{{merchant_id}}",
  "secured_key": "{{secured_key}}",
  "txn_amount": "1000",
  "basket_id": "ORDER123"
}
```

---

## ✅ Test Credentials

Use real merchant data during testing — the system validates live against PayFast.

---

## 🧑‍💻 Built By

Faizan Akram — [10xCollab.com](https://10xcollab.com)

---

For support or contribution, open an issue or contact via WhatsApp/LinkedIn.

---

## 📁 License

MIT
