import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure files exist
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletter.json');
if (!fs.existsSync(NEWSLETTER_FILE)) {
  fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify([]));
}

const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
}

const PAYPAL_CONFIG_FILE = path.join(DATA_DIR, 'paypal_config.json');
if (!fs.existsSync(PAYPAL_CONFIG_FILE)) {
  fs.writeFileSync(PAYPAL_CONFIG_FILE, JSON.stringify({
    paypalClientId: "test",
    paypalMode: "sandbox",
    paypalEmail: ""
  }, null, 2));
}

// ----------------------
// API ROUTES
// ----------------------

// Get PayPal Config
app.get('/api/paypal-config', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(PAYPAL_CONFIG_FILE, 'utf8'));
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la lecture de la configuration PayPal.' });
  }
});

// Update PayPal Config
app.post('/api/paypal-config', (req, res) => {
  try {
    const { paypalClientId, paypalMode, paypalEmail } = req.body;
    if (!paypalClientId) {
      return res.status(400).json({ error: 'Le Client ID PayPal est requis.' });
    }

    const config = {
      paypalClientId: paypalClientId.trim(),
      paypalMode: paypalMode === 'live' ? 'live' : 'sandbox',
      paypalEmail: (paypalEmail || '').trim()
    };

    fs.writeFileSync(PAYPAL_CONFIG_FILE, JSON.stringify(config, null, 2));
    res.json({ success: true, config });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la configuration.' });
  }
});

// Subscribe to newsletter
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Adresse e-mail invalide.' });
    }

    const currentSubscribers = JSON.parse(fs.readFileSync(NEWSLETTER_FILE, 'utf8'));
    const trimmedEmail = email.trim().toLowerCase();

    if (!currentSubscribers.includes(trimmedEmail)) {
      currentSubscribers.push(trimmedEmail);
      fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(currentSubscribers, null, 2));
    }

    res.json({ success: true, message: 'Inscription réussie.' });
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Get newsletter subscribers
app.get('/api/newsletter', (req, res) => {
  try {
    const currentSubscribers = JSON.parse(fs.readFileSync(NEWSLETTER_FILE, 'utf8'));
    res.json(currentSubscribers);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Delete subscriber
app.delete('/api/newsletter/:email', (req, res) => {
  try {
    const emailToDelete = req.params.email.trim().toLowerCase();
    let subscribers = JSON.parse(fs.readFileSync(NEWSLETTER_FILE, 'utf8'));
    subscribers = subscribers.filter(e => e !== emailToDelete);
    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Submit new order
app.post('/api/orders', (req, res) => {
  try {
    const order = req.body;
    if (!order || !order.id || !order.fullName || !order.phone) {
      return res.status(400).json({ error: 'Données de commande incomplètes.' });
    }

    const currentOrders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
    // Ensure uniqueness
    if (!currentOrders.some(o => o.id === order.id)) {
      currentOrders.push(order);
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(currentOrders, null, 2));
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error('Order saving error:', error);
    res.status(500).json({ error: 'Erreur de serveur lors de la commande.' });
  }
});

// Get orders
app.get('/api/orders', (req, res) => {
  try {
    const currentOrders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
    res.json(currentOrders);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Delete order
app.delete('/api/orders/:id', (req, res) => {
  try {
    const orderId = req.params.id;
    let orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
    orders = orders.filter(o => o.id !== orderId);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Serve the admin page explicitly if requested
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve static assets from the root directory
app.use(express.static(__dirname));

// Serve index.html as fallback for any frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
