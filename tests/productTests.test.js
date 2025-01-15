const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  test('GET /producto/1 - Should return product details', async () => {
    const res = await request(app).get('/producto/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('stock');
  });

  test('POST /producto - Should add a new product', async () => {
    const res = await request(app).post('/producto').send({
      id: 3,
      name: 'Keyboard',
      stock: 15,
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Producto agregado exitosamente.');
  });

  test('PUT /producto/1 - Should update stock', async () => {
    const res = await request(app).put('/producto/1').send({
      nueva_cantidad: 20,
    });
    expect(res.status).toBe(200);
    expect(res.body.product.stock).toBe(20);
  });
});
