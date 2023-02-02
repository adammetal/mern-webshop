const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const CardModel = require('./models/card.shema');
const BidModel = require('./models/bid.schema');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

const time = (format) => {
  return (req, res, next) => {
    const now = new Date();

    if (format === 'iso') {
      console.log(now.toISOString());
    } else if (format === 'simple') {
      console.log(now.toDateString());
    } else {
      console.log('lol noob');
    }

    next();
  }
}

app.use(time('iso'));

const getBidById = (id) => BidModel.findById(id);

app.use('/api/bids/:id', async (req, res, next) => {
  const bid = await getBidById(req.params.id);

  if (!bid) {
    res.status(404).end();
    return;
  }

  req.bid = bid;
  next();
});

app.get('/api/cards', async (req, res, next) => {
  const cards = await CardModel.find();
  res.json(cards);
});

app.get('/api/cards/:id/bids', async (req, res) => {
  const bids = await BidModel.find({ card: req.params.id }).populate('card');
  res.json(bids);
});

app.get('/api/bids', async (req, res) => {
  const bids = await BidModel.find();
  res.json(bids);
});


app.get('/api/bids/:id', (req, res) => {
  res.json(req.bid);
});

app.post('/api/bids', async (req, res) => {
  const bid = req.body;
  const saved = await BidModel.create(bid);
  res.json(saved);
});

app.patch('/api/bids/:id', async (req, res) => {
  const fields = req.body;
  const bid = await getBidById(req.params.id);
  const updated = await bid.set(fields).save();
  res.json(updated);
});

app.delete('/api/bids/:id', async (req, res) => {
  const id = req.params.id;
  const deleted = await BidModel.deleteOne({ _id: id });
  res.json(deleted);
});

module.exports = app;
