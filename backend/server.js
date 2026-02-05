const express = require('express');
const app = express();
app.use(express.json());

const doctorRoutes = require('./routes/doctors');
const slotRoutes = require('./routes/slots');
const tokenRoutes = require('./routes/tokens');

app.use('/doctors', doctorRoutes);
app.use('/slots', slotRoutes);
app.use('/tokens', tokenRoutes);

const { doctors } = require('./data/initData');

app.get('/simulation', (req, res) => {
  res.json({
    message: "Simulation of one OPD day with 3 doctors and 4 slots each",
    doctors
  });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
