// script-administrar.js

// Datos de ejemplo para los productos (pueden venir del backend)
let productos = [
    { id: 1, imagen: 'imagenes/producto1.jpg', nombre: 'Producto 1', descripcion: 'Descripción del Producto 1', precio: '1000', stock: '10' },
    { id: 2, imagen: 'imagenes/producto2.jpg', nombre: 'Producto 2', descripcion: 'Descripción del Producto 2', precio: '2000', stock: '8' },
    { id: 3, imagen: 'imagenes/producto3.jpg', nombre: 'Producto 3', descripcion: 'Descripción del Producto 3', precio: '1500', stock: '5' },
  ];
  
  // Función para inicializar la tabla con los productos actuales
  function inicializarTabla() {
    const tbody = document.querySelector('#tablaProductos tbody');
    tbody.innerHTML = '';
  
    productos.forEach((producto, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="text" value="${producto.imagen}" onchange="actualizarCampo(${index}, 'imagen', this.value)"></td>
        <td><input type="text" value="${producto.nombre}" onchange="actualizarCampo(${index}, 'nombre', this.value)"></td>
        <td><input type="text" value="${producto.descripcion}" onchange="actualizarCampo(${index}, 'descripcion', this.value)"></td>
        <td><input type="text" value="${producto.precio}" onchange="actualizarCampo(${index}, 'precio', this.value)"></td>
        <td><input type="text" value="${producto.stock}" onchange="actualizarCampo(${index}, 'stock', this.value)"></td>
        <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Función para agregar un nuevo producto
  function agregarProducto() {
    productos.push({
      imagen: '',
      nombre: '',
      descripcion: '',
      precio: '',
      stock: ''
    });
    inicializarTabla();
  }
  
  // Función para eliminar un producto
  function eliminarProducto(index) {
    productos.splice(index, 1);
    inicializarTabla();
  }
  
  // Función para actualizar un campo específico del producto
  function actualizarCampo(index, campo, valor) {
    productos[index][campo] = valor;
  }
  
  // Función para guardar los cambios (simulada, puedes adaptarla según tu backend)
  function guardarCambios() {
    alert('Cambios guardados correctamente');
    // Aquí puedes enviar productos al servidor o actualizar localmente según tu implementación
    console.log(productos);
    // Actualizar el catálogo después de guardar cambios (simulado)
    // actualizarCatalogo();
  }
  
  // Ejecutar inicialización al cargar la página
  document.addEventListener('DOMContentLoaded', inicializarTabla);
  
  // Asignar eventos a botones
  document.getElementById('agregarProducto').addEventListener('click', agregarProducto);
  document.getElementById('guardarCambios').addEventListener('click', guardarCambios);
  