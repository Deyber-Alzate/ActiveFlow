// Simulación de productos (se deberían cargar desde la base de datos)
let productos = [
  { id: 1, nombre: 'Camiseta Deportiva', descripcion: 'Camiseta transpirable para entrenamiento', precio: 35000, imagen: 'imagenes/Camiseta.jpg', stock: 10 },
  { id: 2, nombre: 'Pantalones Deportivos', descripcion: 'Pantalones cómodos para cualquier tipo de actividad física', precio: 55000, imagen: 'imagenes/pantalones.jpeg', stock: 8 },
  { id: 3, nombre: 'Zapatillas de Running', descripcion: 'Zapatillas ligeras y resistentes para correr', precio: 130000, imagen: 'imagenes/zapatillas.jpg', stock: 5 }
];

// Función para formatear el precio
function formatearPrecio(precio) {
  // Redondear el precio y convertirlo a entero para eliminar decimales
  let precioFormateado = Math.round(precio);

  // Convertir el número a una cadena y añadir separadores de miles
  precioFormateado = precioFormateado.toLocaleString('es-ES');

  return precioFormateado;
}

// Recorrer los productos y formatear el precio de cada uno
productos.forEach(producto => {
  producto.precio;
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
          <p class="precio">$${producto.precio = formatearPrecio(producto.precio)}</p>
          <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})" ${producto.stock === 0 ? 'disabled' : ''}>
            ${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>
    `;
  });

  document.querySelector('.productos-grid').innerHTML = productosHTML;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let encontrado = carrito.find(item => item.id === id);

  if (encontrado) {
    if (encontrado.cantidad < productos.find(p => p.id === id).stock) {
      encontrado.cantidad++;
      alert('Producto agregado al carrito')
    } else {
      alert('¡No hay suficiente stock disponible!');
    }
  } else {
    carrito.push({ id: id, nombre: nombre, precio: precio, cantidad: 1 });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
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
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
  let carrito = obtenerCarrito();
  let nuevoCarrito = carrito.filter(item => item.id !== idProducto);
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  actualizarCarrito();
}

// Función para obtener el contenido actual del carrito
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
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
          <span>Precio: $${item.precio}</span>
          <span>Cantidad: ${item.cantidad}</span>
          <span>Total: $${(item.precio * item.cantidad)}</span>
        </div>
      </div>
    `;
    total += item.precio * item.cantidad;
  });

  // Mostrar el carrito en el DOM
  document.querySelector('.carrito-items').innerHTML = carritoHTML;

  // Mostrar el total del carrito
  document.querySelector('.carrito-total').textContent = `$${total.toFixed(2)}`;
}

// Función para mostrar el carrito
function mostrarCarrito() {
  actualizarCarrito(); // Actualizar el contenido del carrito antes de mostrarlo
}


// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
});
