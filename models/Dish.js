
const dishes = [
  { id: 1, name: 'Хинкали', price: -450, category: 'Горячее', image: 'Горячее' },
  { id: 2, name: 'Салат из баклажанов', price: 320, category: 'Салаты', image: 'Салаты' },
  { id: 3, name: 'Лимонад', price: 280, category: 'Напитки', image: 'Напитки' },
];

class Dish {
  static getAll() {
    return dishes;
  }

  static findById(id) {
    return dishes.find(dish => dish.id === parseInt(id));
  }

  static findByCategory(category) {
    return dishes.filter(dish => dish.category === category);
  }
}

module.exports = Dish;