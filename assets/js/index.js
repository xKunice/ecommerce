fetch('db.json')
  .then(response => response.json())
  .then(data => {

    if (localStorage.getItem('productos')) {
      const productosGuardados = JSON.parse(localStorage.getItem('productos'));
      data.productos = productosGuardados;
    } else {
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
          <div class="contenedor__descripcion">
            <h3>${producto.nombre}</h3>
            <span>$${producto.precio}</span>
            <button>Ver Producto</button>
          </div>
        `;
        contenedorProductos.appendChild(productoDiv);
      });
      
      localStorage.setItem('productos', JSON.stringify(data.productos));
      const productosGuardados = JSON.parse(localStorage.getItem('productos'));

      if (JSON.stringify(data.productos) === JSON.stringify(productosGuardados)) {
        console.log('Los productos se guardaron correctamente');
      } else {
        console.log('Los productos no se guardaron correctamente');
      }


    } else {
      console.log('El archivo JSON no contiene un array de productos');
    }
    

    const busqueda = document.getElementById('busqueda');
    const btnBusqueda = document.getElementById('btnBusqueda');
    const resultadoBusqueda = document.getElementById('resultadoBusqueda');
    
    btnBusqueda.addEventListener('click', (event) => {
      const productoTienda = document.getElementById('productosTienda');
      const productoEncontrado = data.productos.find(producto => producto.nombre === busqueda.value);

      if(busqueda.value === '') {
        alert('Ingrese un producto a buscar');
        return;
      }
      if(productoEncontrado){
        productoTienda.style.display = 'none';
        resultadoBusqueda.style.display = 'block';
        alert('Producto encontrado');
        resultadoBusqueda.innerHTML = `
        <button id ="regresar">Regresar a la tienda</button>
        <div class=card>
        <div class="contenedor__img">
        <img src="${productoEncontrado.imagen}" alt="${productoEncontrado.nombre}">
        </div>
        <div class="contenedor__descripcion">
        <h3>${productoEncontrado.nombre}</h3>
        <span>$${productoEncontrado.precio}</span>
        <button>Agregar al carrito</button>
      </div>
      </div>
        `;
        const btnRegresar = document.getElementById('regresar');
      if (btnRegresar) {
        btnRegresar.addEventListener('click', (event) => {
          productoTienda.style.display = 'block';
          resultadoBusqueda.style.display = 'none';
          resultadoBusqueda.innerHTML = '';
      });
}
      }else{
        alert('No se encontro el producto');
    
      }
    
    
    });
    const btnVerProductosBanner =document.getElementById('btnVerProductosBanner');

  btnVerProductosBanner.addEventListener('click', (event) =>{
    event.preventDefault();
    const productosMarvel = document.getElementById('marvel');
    const productosDc = document.getElementById('dc');
    const ads = document.getElementById('ads');
    const divVerProductos = document.createElement('div');
    const productosStarWars = document.getElementById('starwars');
    btnVerProductosBanner.style.display = 'none';

    divVerProductos.classList.add('divVerProductos');
    productosDc.style.display ='none';
    productosMarvel.style.display = 'none';
    divVerProductos.innerHTML=`
      <button id ="regresartienda">Regresar a la Tienda</button>
    `;
    ads.appendChild(divVerProductos);

    const btnRegresar = document.getElementById('regresartienda');
      if (btnRegresar) {
        btnRegresar.addEventListener('click', (event) => {
          event.preventDefault();
          // Restaura la visualización de los elementos ocultos
          productosDc.style.display = 'flex';
          productosMarvel.style.display = 'flex';
          btnVerProductosBanner.style.display = 'block';
          // Elimina el div de productos agregado anteriormente
          ads.removeChild(divVerProductos);
        });
    };


  
  });
  
    
  })
  .catch(error => {
    console.log('Error al leer el archivo JSON', error);
  });

  const btnLogin = document.getElementById('Login');

btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = './login.html';
});


