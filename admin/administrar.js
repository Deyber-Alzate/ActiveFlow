// script-administrar.js

// Datos de ejemplo para los productos (pueden venir del backend)
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
  