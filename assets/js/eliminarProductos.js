export const eliminarProductos = (obtenerDatos) =>{
obtenerDatos().then(data => {

    const btnEliminarProducto = document.getElementById('btnEliminar');
    btnEliminarProducto.addEventListener('click', () => {
        const divContenedor = document.createElement('div');
        const contenedorProductos = document.getElementById('ShowOption');
        contenedorProductos.innerHTML='';
        divContenedor.classList.add('contenedor__editar');
        divContenedor.innerHTML=`
            <h3>Editar Producto</h3>
            <p>Seleccione el producto que desea editar</p>
            <form>
                <select id="categoria" name="categoria">
                    <option value="marvel">Marvel</option>
                    <option value="dc">DC</option>
                    <option value="starWars">StarWars</option>
                </select>
                <button type="submit">Eliminar Producto</button> 
            </form>
        `;
        contenedorProductos.appendChild(divContenedor);
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            divContenedor.innerHTML='';
            const categoriaForm = form.elements.categoria.value;
            data.productos.forEach((producto) => {
                if(producto.categoria === categoriaForm){
                        const divContenedorProducto = document.createElement('div');
                        divContenedorProducto.classList.add('contenedor__producto');
                        divContenedorProducto.id = `${producto.id}`
                        divContenedorProducto.innerHTML=`
                        <div class="contenedor__img">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                        </div>
                        <div class="contenedor__Descripcion">
                            <h3>${producto.nombre}</h3>
                            <span>$${producto.precio}</span>
                            <button class="btn__eliminar--producto" >Eliminar</button>
                        </div>
                        `;
                        contenedorProductos.appendChild(divContenedorProducto);
                }
            })

            const btnEliminarProducto = document.getElementsByClassName('btn__eliminar--producto');
            for (let i = 0; i < btnEliminarProducto.length; i++) {
                btnEliminarProducto[i].addEventListener('click', () => {
                    const productoAEliminar = btnEliminarProducto[i].parentNode.parentNode;
                    const idProductoAEliminar = productoAEliminar.id;
                    const productoAeliminarEncontrado = data.productos.find(producto => producto.id === idProductoAEliminar);
                    if(productoAeliminarEncontrado){
                        const index = data.productos.indexOf(productoAeliminarEncontrado);
                        data.productos.splice(index, 1);
                    }else{
                        console.log('no se encontro el producto');
                    }

                });
            }
        });
        
    });



  });
}