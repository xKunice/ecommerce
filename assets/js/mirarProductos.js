export const mirarProductos = (obtenerDatos) =>{
obtenerDatos().then(data => { 
        const mirar = document.getElementById('btnMirar');
        mirar.addEventListener('click', () => {    
            const contenedorProductos = document.getElementById('ShowOption');
            contenedorProductos.innerHTML='';
            data.productos.forEach((producto) => {
                const divContenedor = document.createElement('div'); 
                divContenedor.classList.add('contenedor__productos');
                divContenedor.innerHTML = `
                    <div class="contenedor__img">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <div class="contenedor__Descripcion">
                        <h3>${producto.nombre}</h3>
                        <span>$${producto.precio}</span>
                    </div>`;
                contenedorProductos.appendChild(divContenedor);
            });  
        });
    });
}