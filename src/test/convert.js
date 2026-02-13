const convert = require('../convert');
const expect = require('chai').expect;

describe('Conversor de Temperatura', () => {

  describe('fahrenheitCelsius', () => {
    it('converte 131°F para 55°C', () => {
      expect(convert.fahrenheitCelsius(131)).to.equal(55);
    });

    it('converte 32°F para 0°C', () => {
      expect(convert.fahrenheitCelsius(32)).to.equal(0);
    });

    it('converte 212°F para 100°C', () => {
      expect(convert.fahrenheitCelsius(212)).to.equal(100);
    });

    it('converte valor negativo: -40°F para -40°C', () => {
      expect(convert.fahrenheitCelsius(-40)).to.equal(-40);
    });

    it('retorna número para entrada numérica', () => {
      const resultado = convert.fahrenheitCelsius(0);
      expect(resultado).to.be.a('number');
    });
  });

  describe('celsiusFahrenheit', () => {
    it('converte 55°C para 131°F', () => {
      expect(convert.celsiusFahrenheit(55)).to.equal(131);
    });

    it('converte 0°C para 32°F', () => {
      expect(convert.celsiusFahrenheit(0)).to.equal(32);
    });

    it('converte 100°C para 212°F', () => {
      expect(convert.celsiusFahrenheit(100)).to.equal(212);
    });

    it('converte valor negativo: -40°C para -40°F', () => {
      expect(convert.celsiusFahrenheit(-40)).to.equal(-40);
    });

    it('retorna número para entrada numérica', () => {
      const resultado = convert.celsiusFahrenheit(0);
      expect(resultado).to.be.a('number');
    });
  });

  describe('consistência entre as duas conversões', () => {
    it('converter C->F->C retorna o valor original (aproximado)', () => {
      const original = 37;
      const f = convert.celsiusFahrenheit(original);
      const c = convert.fahrenheitCelsius(f);
      expect(c).to.be.closeTo(original, 0.01);
    });

    it('converter F->C->F retorna o valor original (aproximado)', () => {
      const original = 98.6;
      const c = convert.fahrenheitCelsius(original);
      const f = convert.celsiusFahrenheit(c);
      expect(f).to.be.closeTo(original, 0.01);
    });
  });
});
