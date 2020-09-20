// require mongoose
const mongoose = require('mongoose');
// require express
const express = require('express');

// define express()
const app = express();
// define PORT
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// log mongo queries being executed
mongoose.set('debug', true);
// express start to listen for connection
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
