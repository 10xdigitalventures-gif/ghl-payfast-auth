// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// /auth route to verify credentials
app.post('/auth', async (req, res) => {
  const { merchant_id, secured_key, txn_amount = '10', basket_id = 'test123', currency = 'PKR' } = req.body;

  if (!merchant_id || !secured_key) {
    return res.status(400).json({ success: false, message: 'Missing merchant_id or secured_key' });
  }

  const payfastURL = `https://ipg1.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken?MERCHANT_ID=${merchant_id}&SECURED_KEY=${secured_key}&TXNAMT=${txn_amount}&BASKET_ID=${basket_id}&CURRENCY_CODE=${currency}`;

  try {
    const response = await axios.get(payfastURL);
    const data = response.data;

    if (data.ACCESS_TOKEN) {
      return res.json({ success: true, message: 'Valid credentials', access_token: data.ACCESS_TOKEN });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials', response: data });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'PayFast API error', error: error.message });
  }
});

// Optional: webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('Received PayFast callback:', req.body);
  res.status(200).json({ success: true });
});

app.get('/', (req, res) => {
  res.send('PayFast Auth Server Running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
