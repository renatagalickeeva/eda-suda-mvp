/**
 * Тесты для функционала корзины, логика работы с орзиной 
 */

describe('Cart Functionality', () => {
  
  const mockLocalStorage = (() => {
    let store = {}; // Типа импровизированная база данных 
    return {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value.toString();
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      })
    };
  })();

  beforeEach(() => {
  
    global.localStorage = mockLocalStorage;
    mockLocalStorage.clear();
  });

  // Тест 1: Добавление товара в корзину
  test('should add item to cart', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const newItem = { id: 1, name: 'Хинкали', price: 450 };
    cart.push(newItem);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', 
      JSON.stringify([newItem])
    );
  });

  // Тест 2: Получение пустой корзины
  test('should return empty array when cart is empty', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    expect(cart).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledWith('cart');
  });

  // Тест 3: Удаление товара из корзины
  test('should remove item from cart by index', () => {
    // Сначала добавляем товары
    const cart = [
      { id: 1, name: 'Хинкали', price: 450 },
      { id: 2, name: 'Салат с баклажанами', price: 220 },
      { id: 3, name: 'Лимонад', price: 150 }
    ];
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Удаляем второй товар (индекс 1)
    cart.splice(1, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const updatedCart = JSON.parse(localStorage.getItem('cart'));
    
    expect(updatedCart).toHaveLength(2);
    expect(updatedCart[0].name).toBe('Хинкали');
    expect(updatedCart[1].name).toBe('Лимонад');
  });

  // Тест 4: Очистка корзины
  test('should clear entire cart', () => {
    const cart = [
      { id: 1, name: 'Хинкали', price: 450 },
      { id: 2, name: 'Салат с баклажанами', price: 220 }
    ];
    
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('cart');
    
    const emptyCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    expect(emptyCart).toEqual([]);
    expect(localStorage.removeItem).toHaveBeenCalledWith('cart');
  });
  
});