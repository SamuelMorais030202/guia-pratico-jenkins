const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server');

describe('API do Servidor', () => {

  describe('GET / - Página inicial', () => {
    it('retorna status 200 e HTML', async () => {
      const res = await request(app).get('/');
      expect(res.status).to.equal(200);
      expect(res.headers['content-type']).to.include('text/html');
      expect(res.text).to.include('Conversor de Temperatura');
    });

    it('inclui o hostname da máquina no HTML', async () => {
      const res = await request(app).get('/');
      expect(res.text).to.match(/Host: \S+/);
    });
  });

  describe('GET /fahrenheit/:valor/celsius', () => {
    it('converte 131°F para 55°C e retorna JSON', async () => {
      const res = await request(app).get('/fahrenheit/131/celsius');
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('celsius', 55);
      expect(res.body).to.have.property('maquina');
    });

    it('converte 32°F para 0°C', async () => {
      const res = await request(app).get('/fahrenheit/32/celsius');
      expect(res.body.celsius).to.equal(0);
    });
  });

  describe('GET /celsius/:valor/fahrenheit', () => {
    it('converte 55°C para 131°F e retorna JSON', async () => {
      const res = await request(app).get('/celsius/55/fahrenheit');
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('fahrenheit', 131);
      expect(res.body).to.have.property('maquina');
    });

    it('converte 0°C para 32°F', async () => {
      const res = await request(app).get('/celsius/0/fahrenheit');
      expect(res.body.fahrenheit).to.equal(32);
    });
  });

  describe('POST / - Conversão via formulário', () => {
    it('converte Celsius para Fahrenheit (selectTemp=1)', async () => {
      const res = await request(app)
        .post('/')
        .type('form')
        .send({ valorRef: '55', selectTemp: '1' });
      expect(res.status).to.equal(200);
      expect(res.text).to.include('131');
    });

    it('converte Fahrenheit para Celsius (selectTemp=2)', async () => {
      const res = await request(app)
        .post('/')
        .type('form')
        .send({ valorRef: '131', selectTemp: '2' });
      expect(res.status).to.equal(200);
      expect(res.text).to.include('55');
    });

    it('sem valorRef retorna página sem valor convertido', async () => {
      const res = await request(app)
        .post('/')
        .type('form')
        .send({ selectTemp: '1' });
      expect(res.status).to.equal(200);
      expect(res.text).to.include('Conversor de Temperatura');
    });
  });
});
