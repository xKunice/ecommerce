const slider = document.querySelector('.slider');
const punto = document.querySelectorAll('.punto');

punto.forEach((cadaPunto , i) =>{
  punto[i].addEventListener('click',()=>{

    let posicion = i;

    let operacion = posicion * -50;
    slider.style.transform = `translateX${ operacion}%`;
    punto.forEach((cadaPunto, i)=>{
      punto[i].classList.remove('activo');
    })
    punto[i].classList.add('activo');
  })
})


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
      }else{
        alert('Buscando producto');
      }
      if(productoEncontrado){
        productoTienda.style.display = 'none';
        resultadoBusqueda.style.display = 'block';
        alert('Producto encontrado');
        resultadoBusqueda.innerHTML = `
        <button id ="regresar">Regresar a la tienda</button>
        <div class="contenedor__img">
        <img src="${productoEncontrado.imagen}" alt="${productoEncontrado.nombre}">
        </div>
        <div class="contenedor__Descripcion">
        <h3>${productoEncontrado.nombre}</h3>
        <span>$${productoEncontrado.precio}</span>
        <button>Agregar al carrito</button>
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
    





    
  })
  .catch(error => {
    console.log('Error al leer el archivo JSON', error);
  });

  const btnLogin = document.getElementById('Login');

btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = './login.html';
});


