const menuController = require('../controllers/menuController');
const Dish = require('../models/Dish');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  return res;
};

describe('Menu Controller', () => {
  // Тест 1: Получение меню
  test('getMenu should render menu page with dishes', () => {
    const req = {};
    const res = mockResponse();
    
    menuController.getMenu(req, res);
    
    expect(res.render).toHaveBeenCalledWith('menu', {
      dishes: expect.any(Array)
    });
    
    // Проверяем что передаются именно блюда из модели
    expect(res.render.mock.calls[0][1].dishes).toEqual(Dish.getAll());
  });

  // Тест 2: Получение блюда по ID 
  test('getDishById should return dish for valid id', () => {
    const req = { params: { id: '1' } };
    const res = mockResponse();
    
    menuController.getDishById(req, res);
    
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: 'Хинкали'
      })
    );
  });

  // Тест 3: Ошибка для несуществующего ID
  test('getDishById should return 404 for invalid id', () => {
    const req = { params: { id: '999' } };
    const res = mockResponse();
    
    menuController.getDishById(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Блюдо не найдено'
    });
  });

  // Тест 4: Обработка некорректного ID
  test('getDishById should handle non-numeric id', () => {
    const req = { params: { id: 'invalid' } };
    const res = mockResponse();
    
    menuController.getDishById(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Блюдо не найдено'
    });
  });
});