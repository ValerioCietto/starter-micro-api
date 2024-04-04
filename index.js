const express = require('express');
const crypto = require("crypto");
const app = express();
const port = 3000;
const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb("average-tick-flannel-nightgownCyclicDB")
app.use(express.json());
const appointments = db.collection("appointments")

// Endpoint 1: Return order status
app.get('/order/:id/status', (req, res) => {
  const orderId = req.params.id;
  res.json({
    orderId: orderId,
    status: 'shipped',
    dueDate: '2023-12-10'
  });
});

app.post('/booking/new', async (req, res) => {
  const booking = req.body;
  const id = crypto.randomBytes(16).toString("hex");
  let appointment = await appointments.set(id, booking);
  res.json(appointment);
});
// {
//     "collection": "appointments",
//     "key": "e12495c4ef4b162a2279feca62037ecb",
//     "props": {
//         "nominativo": "don diego de la vega",
//         "data": "23-05-2025",
//         "ora": "12:03:00",
//         "motivo-visita": "tatuaggio alla spalla sinistra di un drago",
//         "sintesi-richiesta": "tatuaggio spalla drago"
//     }
// }

// Endpoint 2: Return warranty status (randomly true or false)
app.get('/order/:id/warranty', (req, res) => {
  const warrantyValid = Math.random() < 0.5; // 50% chance
  res.json({ warrantyValid });
});

// Endpoint 3: Redirect to a chat operator (placeholder URL)
app.get('/redirectChatOperator', (req, res) => {
  res.redirect('http://example.com/chat-operator');
});

// Endpoint 5: 
app.get('/privacy', (req, res) => {
  res.send('privacy policy: we don\'t save any user data');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
