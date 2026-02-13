const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server');

describe('API Health / System Life', () => {

  describe('GET /health', () => {
    it('retorna 200 e "OK"', async () => {
      const res = await request(app).get('/health');
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('OK');
    });
  });

  describe('GET /ready', () => {
    it('retorna 200 quando o serviço está ready', async () => {
      const res = await request(app).get('/ready');
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('Ok');
    });
  });

  describe('PUT /unreadyfor/:seconds', () => {
    it('aceita a rota e retorna 200', async () => {
      const res = await request(app).put('/unreadyfor/5');
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('OK');
    });

    it('após unreadyfor, /ready pode retornar 500 (durante o período)', async () => {
      await request(app).put('/unreadyfor/10');
      const res = await request(app).get('/ready');
      expect(res.status).to.equal(500);
    });
  });

  describe('PUT /stress/tempo/:tempoStress/intervalo/:intervalo/ciclos/:ciclos', () => {
    it('aceita a rota e retorna 200', async () => {
      const res = await request(app)
        .put('/stress/tempo/1/intervalo/1/ciclos/1');
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('OK');
    });
  });

  describe('PUT /unhealth', () => {
    it('aceita a rota e retorna 200', async () => {
      const res = await request(app).put('/unhealth');
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('OK');
    });
    // Nota: após unhealth o middleware retorna 500 em todas as rotas. Este teste fica por último.
  });
});
