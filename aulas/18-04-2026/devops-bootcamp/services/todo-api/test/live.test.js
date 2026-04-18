const request = require('supertest');
const { createApp } = require('../src/app');

test('GET /live returns ok', async () => {
  const { app, close } = createApp();
  const res = await request(app).get('/live');

  expect(res.status).toBe(200);
  expect(res.body).toEqual({ status: 'ok' });

  await close();
});
