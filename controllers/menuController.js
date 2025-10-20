const Dish = require('../models/Dish');

exports.getMenu = (req, res) => {
  const dishes = Dish.getAll();
  res.render('menu', { dishes });
};

exports.getDishById = (req, res) => {
  const dish = Dish.findById(req.params.id);
  if (!dish) {
    return res.status(404).json({ error: 'Блюдо не найдено' });
  }
  res.json(dish);
};