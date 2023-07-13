fetch('db.json')
  .then(response => response.json())
  .then(data => {
        
    if (Array.isArray(data.productos)) {

      data.productos.forEach((producto) => {
        const productoDiv = document.createElement('div');
        const contenedorProductos = document.getElementById(producto.categoria);
        productoDiv.classList.add('card');
        productoDiv.innerHTML = `
          <div class="contenedor__img">
            <img src="${producto.imagen}" alt="${producto.nombre}">
          </div>
          <div class="contenedor__Descripcion">
            <h3>${producto.nombre}</h3>
            <span>$${producto.precio}</span>
            <button>Agregar al carrito</button>
          </div>
        `;
        contenedorProductos.appendChild(productoDiv);
      });
      
    } else {
      console.log('El archivo JSON no contiene un array de productos');
    }
  })
  .catch(error => {
    console.log('Error al leer el archivo JSON', error);
  });
