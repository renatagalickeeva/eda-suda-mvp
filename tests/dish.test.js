const Dish = require('../models/Dish');

describe('Dish Model', () => {
  // Тест 1: Получение всех блюд
  test('should return all dishes', () => {
    const dishes = Dish.getAll();
    
    expect(dishes).toHaveLength(3);
    expect(Array.isArray(dishes)).toBe(true);
    
    expect(dishes[0]).toHaveProperty('id');
    expect(dishes[0]).toHaveProperty('name');
    expect(dishes[0]).toHaveProperty('price');
    expect(dishes[0]).toHaveProperty('category');
  });

  // Тест 2: Поиск блюда по ID
  test('should find dish by id', () => {
    const dish = Dish.findById(1);
    
    expect(dish).toBeDefined();
    expect(dish.id).toBe(1);
    expect(dish.name).toBe('Хинкали');
    expect(dish.price).toBe(450);
  });

  // Тест 3: Поиск несуществующего блюда
  test('should return undefined for non-existent id', () => {
    const dish = Dish.findById(999);
    expect(dish).toBeUndefined();
  });

  // Тест 4: Поиск по категории
  test('should find dishes by category', () => {
    const pizzas = Dish.findByCategory('Горячее');
    
    expect(pizzas).toHaveLength(1);
    expect(pizzas[0].category).toBe('Горячее');
    
    const salads = Dish.findByCategory('Салаты');
    expect(salads).toHaveLength(1);
    expect(salads[0].name).toBe('Салат из баклажанов');
  });

  // Тест 5: Пустой результат для несуществующей категории
  test('should return empty array for non-existent category', () => {
    const result = Dish.findByCategory('НесуществующаяКатегория');
    expect(result).toHaveLength(0);
    expect(Array.isArray(result)).toBe(true);
  });
});