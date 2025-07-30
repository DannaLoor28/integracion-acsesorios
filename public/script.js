const productos = [
  { nombre: "Pulsera", precio: 5.00, imagen: "https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/denouer-b/alloycolour/yellow.jpg" },
  { nombre: "Collar", precio: 8.00, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5OMhitZf4liE4iVCnpjvj9IoaAMh_q668Yg&s" },
  { nombre: "Anillo", precio: 4.50, imagen: "https://m.media-amazon.com/images/I/71jvlUtggJL._AC_SL1200_.jpg" }
];

const galeria = document.getElementById('galeria');
const lista = document.getElementById('lista-pedido');
const suma = document.getElementById('suma');
const boton = document.getElementById('confirmar');
let pedido = [];

productos.forEach(p => {
  const div = document.createElement('div');
  div.className = 'producto';
  div.innerHTML = `
    <img src="${p.imagen}" width="100%">
    <h3>${p.nombre}</h3>
    <p>$${p.precio.toFixed(2)}</p>
    <button>Agregar</button>
  `;
  div.querySelector('button').addEventListener('click', () => {
    pedido.push(p);
    actualizar();
  });
  galeria.appendChild(div);
});

function actualizar() {
  lista.innerHTML = '';
  let total = 0;
  pedido.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;
    lista.appendChild(li);
    total += p.precio;
  });
  suma.textContent = total.toFixed(2);
}

boton.addEventListener('click', () => {
  localStorage.setItem('totalCompra', suma.textContent);
  window.location.href = 'confirmacion.html';
});
