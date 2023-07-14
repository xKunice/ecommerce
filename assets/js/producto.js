fetch('db.json')
  .then(response => response.json())
  .then(data => {

    if (localStorage.getItem('productos')) {
      
      const productosGuardados = JSON.parse(localStorage.getItem('productos'));
      console.log(productosGuardados);
      console.log(data.productos);
      // Utilizar los datos del localStorage en lugar de los obtenidos mediante fetch
      data.productos = productosGuardados;
    } else {
      // Los datos no están guardados en el localStorage
      console.log('No se encontraron productos en el localStorage');
    }


        
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
      
      localStorage.setItem('productos', JSON.stringify(data.productos));
      const productosGuardados = JSON.parse(localStorage.getItem('productos'));

      if (JSON.stringify(data.productos) === JSON.stringify(productosGuardados)) {
        console.log('Los productos se guardaron correctamente');
        alert('Los productos se guardaron correctamente');
      } else {
        console.log('Los productos no se guardaron correctamente');
        alert('Los productos no se guardaron correctamente');
      }


    } else {
      console.log('El archivo JSON no contiene un array de productos');
    }

  })
  .catch(error => {
    console.log('Error al leer el archivo JSON', error);
  });
