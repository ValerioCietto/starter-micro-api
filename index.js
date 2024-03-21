const express = require('express');
const app = express();
const port = 3000;

// Endpoint 1: Return order status
app.get('/order/:id/status', (req, res) => {
  const orderId = req.params.id;
  res.json({
    orderId: orderId,
    status: 'shipped',
    dueDate: '2023-12-10'
  });
});

// Endpoint 2: Return warranty status (randomly true or false)
app.get('/order/:id/warranty', (req, res) => {
  const warrantyValid = Math.random() < 0.5; // 50% chance
  res.json({ warrantyValid });
});

// Endpoint 3: Redirect to a chat operator (placeholder URL)
app.get('/redirectChatOperator', (req, res) => {
  res.redirect('http://example.com/chat-operator');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
