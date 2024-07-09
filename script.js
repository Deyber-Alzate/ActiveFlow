let productos = [
  { id: 1, nombre: 'Camiseta Deportiva', descripcion: 'Camiseta transpirable para entrenamiento', precio: 35000, imagen: 'imagenes/Camiseta.jpg', stock: 10 },
  { id: 2, nombre: 'Pantalones Deportivos', descripcion: 'Pantalones cómodos para cualquier tipo de actividad física', precio: 55000, imagen: 'imagenes/pantalones.jpeg', stock: 8 },
  { id: 3, nombre: 'Zapatillas de Running', descripcion: 'Zapatillas ligeras y resistentes para correr', precio: 130000, imagen: 'imagenes/zapatillas.jpg', stock: 5 },
  { id: 4, nombre: 'Balon profesional copa america', descripcion: 'Balon profesional para cancha de cesped natural', precio: 500000, imagen: 'imagenes/Balon_Americas.jpg', stock: 10 },
  { id: 5, nombre: 'Pantalon Deportivo 3.0', descripcion: 'pantalones comodos y renovadores 3.0', precio: 250000, imagen: 'imagenes/pantalon2.jpg', stock: 10 },
  { id: 6, nombre: 'Pantalon deportivo dama', descripcion: 'pantalones comodos y novedosos para dama', precio: 250000, imagen: 'imagenes/pantalonmujer.jpg', stock: 10 },
  { id: 7, nombre: 'Medias Deportivas', descripcion: 'Medias comodas y Antideslisantes ', precio: 100000, imagen: 'imagenes/medias_depor.jpg', stock: 10 },
  { id: 8, nombre: 'Zapatos unisex', descripcion: 'Zapatos de suela de aire unisex', precio: 350000, imagen: 'imagenes/zapatosuni.jpg', stock: 10 },
  { id: 9, nombre: 'Guayos verdes', descripcion: 'Guayos con botin alto para cesped natural', precio: 600000, imagen: 'imagenes/guayos.jpg', stock: 10 },
];

// Función para formatear el precio
function formatearPrecio(precio) {
  return precio.toLocaleString('es-ES');
}

// Recorrer los productos y formatear el precio de cada uno
productos.forEach(producto => {
  producto.precio = formatearPrecio(producto.precio);
});

// Función para mostrar productos en el catálogo
function mostrarProductos() {
  let productosHTML = '';

  productos.forEach(producto => {
    productosHTML += `
      <div class="producto-card">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p class="precio">$${producto.precio}</p>
          <p class="stock">Cantidad disponible: ${producto.stock}</p>
          <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio.replace(/\./g, '').replace(',', '.')}, ${producto.stock})" ${producto.stock === 0 ? 'disabled' : ''}>
            ${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>
    `;
  });

  document.querySelector('.productos-grid').innerHTML = productosHTML;
  document.getElementById('productos').style.display = 'block';
  document.getElementById('carrito').style.display = 'none';
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio, stock) {
  let carrito = obtenerCarrito();
  let encontrado = carrito.find(item => item.id === id);
  let producto = productos.find(p => p.id === id);

  if (encontrado) {
    if (encontrado.cantidad < stock) {
      encontrado.cantidad++;
      producto.stock--; // Disminuir el stock del producto
      actualizarStockEnCatalogo(); // Actualizar visualmente el stock en el catálogo
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarrito();
      alert('Producto agregado al carrito');
    } else {
      alert('¡No hay suficiente stock disponible!');
    }
  } else {
    carrito.push({ id: id, nombre: nombre, precio: precio, cantidad: 1 });
    producto.stock--; // Disminuir el stock del producto
    actualizarStockEnCatalogo(); // Actualizar visualmente el stock en el catálogo
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    alert('Producto agregado al carrito');
  }
}

// Función para vaciar el carrito
function vaciarCarrito() {
  let carrito = obtenerCarrito();
  carrito.forEach(item => {
    let producto = productos.find(p => p.id === item.id);
    producto.stock += item.cantidad; // Restaurar el stock de los productos en el carrito
  });
  localStorage.removeItem('carrito');
  actualizarStockEnCatalogo(); // Actualizar visualmente el stock en el catálogo después de vaciar el carrito
  actualizarCarrito();
}



// Función para actualizar visualmente el stock en el catálogo
function actualizarStockEnCatalogo() {
  let productosHTML = '';

  productos.forEach(producto => {
    productosHTML += `
      <div class="producto-card">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p class="precio">$${producto.precio}</p>
          <p class="stock">Cantidad disponible: ${producto.stock}</p>
          <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, ${producto.stock})" ${producto.stock === 0 ? 'disabled' : ''}>
            ${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>
    `;
  });

  document.querySelector('.productos-grid').innerHTML = productosHTML;
}



// Función para obtener el contenido actual del carrito
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Función para calcular el total del carrito
function calcularTotal() {
  let carrito = obtenerCarrito();
  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;
  });

  return total;
}

// Función para vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem('carrito');
  actualizarCarrito();
}

// Función para realizar una compra (simulada)
function realizarCompra() {
  alert('Compra realizada. Gracias por tu compra!');
  vaciarCarrito(); // Vaciar el carrito después de la compra
  actualizarStockEnCatalogo();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
  let carrito = obtenerCarrito();
  let nuevoCarrito = carrito.filter(item => item.id !== idProducto);
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  actualizarCarrito();
}

// Función para actualizar la interfaz del carrito
function actualizarCarrito() {
  let carrito = obtenerCarrito();
  let carritoHTML = '';
  let total = 0;

  carrito.forEach(item => {
    carritoHTML += `
      <div class="item-carrito">
        <div>
          <img src="${productos.find(p => p.id === item.id).imagen}" alt="${item.nombre}">
          <span>${item.nombre}</span>
        </div>
        <div>
          <span>Precio: $${formatearPrecio(item.precio)}</span>
          <span>Cantidad: ${item.cantidad}</span>
          <span>Total: $${formatearPrecio(item.precio * item.cantidad)}</span>
        </div>
        <div>
          <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        </div>
      </div>
    `;
    total += item.precio * item.cantidad;
  });

  // Mostrar el carrito en el DOM
  document.querySelector('.carrito-items').innerHTML = carritoHTML;

  // Mostrar el total del carrito
  document.querySelector('.carrito-total').textContent = `$${formatearPrecio(total)}`;
}

// Función para mostrar el carrito
function mostrarCarrito() {
  actualizarCarrito(); // Actualizar el contenido del carrito antes de mostrarlo
  document.getElementById('productos').style.display = 'none';
  document.getElementById('carrito').style.display = 'block';
}

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();

  // Agregar evento click al botón de catálogo
  document.getElementById('catalogo-button').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarProductos();
  });

  // Agregar evento click al botón de carrito
  document.getElementById('carrito-button').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarCarrito();
  });

  // Agregar evento click al botón de seguir comprando
  document.getElementById('seguir-comprando-button').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarProductos();
    actualizarStockEnCatalogo();
  });
});