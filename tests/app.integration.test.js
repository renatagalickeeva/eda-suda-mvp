const request = require('supertest'); //библиотека для тестирования HTTP серверов

const app = require('../app');

describe('App Integration Tests', () => {
  let server;

  // Запускаем сервер перед всеми тестами
  beforeAll((done) => {
    server = app.listen(0, done); // 0 = случайный порт
  });

  // Закрываем сервер после всех тестов
  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  // Тест 1: Главная страница
  test('GET / should return home page', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.text).toContain('Еда-сюда');
  });

  // Тест 2: Страница меню
  test('GET / menu should return menu page', async () => {
    const response = await request(app).get('/menu');
    
    expect(response.status).toBe(200);
    expect(response.text).toContain('Наше меню');
  });

  // Тест 3: API получение блюда по ID
  test('GET /menu/:id should return dish data', async () => {
    const response = await request(app).get('/menu/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('price');
  });

  // Тест 4: Страница корзины
  test('GET /cart should return cart page', async () => {
    const response = await request(app).get('/cart');
    
    expect(response.status).toBe(200);
    expect(response.text).toContain('Ваша корзина');
  });

});