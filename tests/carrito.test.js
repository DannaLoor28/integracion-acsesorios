/**
 * @jest-environment jsdom
 */
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe("Carrito - Galería", () => {
  let document;
  let pedido = [];

  beforeEach(() => {
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(`
      <ul id="lista-pedido"></ul>
      <span id="suma">0.00</span>
    `);
    document = dom.window.document;
    pedido = [];
  });

  test('agrega producto y calcula total', () => {
    pedido.push({ nombre: "Anillo", precio: 4.5 });
    const lista = document.getElementById('lista-pedido');
    const suma = document.getElementById('suma');
    lista.innerHTML = '';
    let total = 0;
    pedido.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;
      lista.appendChild(li);
      total += p.precio;
    });
    suma.textContent = total.toFixed(2);

    expect(lista.children.length).toBe(1);
    expect(suma.textContent).toBe('4.50');
  });
});
