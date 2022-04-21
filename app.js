import express from 'express';
import mongoose from 'mongoose';
import { mongoURI } from './config/keys.js';

const app = express();

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello There'));
app.listen(port, () => console.log(`Server is running on port ${port}`));
