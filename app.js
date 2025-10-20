const express = require('express');
const path = require('path');
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/menu', menuRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(` MVP сервер запущен на http://localhost:${PORT}`);
});

module.exports = app;