const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3000;

const pocetna = require('./routes/pocetna');
const obrada = require('./routes/obrada');

app.use(cors());
app.use(express.json());
app.use('/', pocetna);
app.use('/api', obrada);

app.listen(PORT, () => {
  console.log(`Povezali smo se na server na portu ${PORT}...`);
});