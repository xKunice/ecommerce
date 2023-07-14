export const editarProductos = (obtenerDatos, actualizarDatos) =>{
obtenerDatos().then(data => { 
    const editar = document.getElementById('btnEditar');
            editar.addEventListener('click', () => {
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
                        <button type="submit">Editar Producto</button> 
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
                                <button class="btn__editar--producto" >Editar</button>
                            </div>
                            `;
                            contenedorProductos.appendChild(divContenedorProducto);
                        }
                    });

                    const btnEditarProducto = document.getElementsByClassName('btn__editar--producto');
                    for (let i = 0; i < btnEditarProducto.length; i++) {
                        btnEditarProducto[i].addEventListener('click', () => {
                            const productoAEditar = btnEditarProducto[i].parentNode.parentNode;
                            const idProductoAEditar = productoAEditar.id;
                            console.log(idProductoAEditar);
                            const productoAeditarEncontrado = data.productos.find(producto => producto.id === idProductoAEditar);
                            if(productoAeditarEncontrado){
                                console.log(productoAeditarEncontrado);
                                contenedorProductos.innerHTML='';
                                const divContenedorProductoEditar = document.createElement('div');
                                divContenedorProductoEditar.classList.add('contenedor__producto--editar');
                                divContenedorProductoEditar.innerHTML=`
                                <div class="contenedor__img">
                                <img src="${productoAeditarEncontrado.imagen}" alt="${productoAeditarEncontrado.nombre}">
                            </div>
                            <div class="contenedor__Descripcion">
                                <h3>${productoAeditarEncontrado.nombre}</h3>
                                <span>$${productoAeditarEncontrado.precio}</span>
                            </div>
                            <div>
                                <h3>Editando...</h3>
                                <form>
                                    <label for="id">Id</label>
                                    <input  value="${productoAeditarEncontrado.id}" id="id" name="id"type="number" placeholder="id del producto" min="1" max="500" required></input>
                                    <label for="nombre">Nombre</label>
                                    <input value="${productoAeditarEncontrado.nombre}" id="nombre" name="nombre" type="text" placeholder="nombre producto" required></input>
                                    <label for="categoria">Categoria</label>
                                    <select value="${productoAeditarEncontrado.categoria}" id="categoria" name="categoria">
                                    <option value="marvel">Marvel</option>
                                    <option value="dc">DC</option>
                                    <option value="starWars">StarWars</option>
                                    </select>
                                    <label for="imagen">Imagen</label>
                                    <input value="${productoAeditarEncontrado.imagen}"id="imagen" name="imagen" type="text" placeholder="url imagen" required></input>
                                    <label for="precio">Precio</label>
                                    <input value="${productoAeditarEncontrado.precio}"id="precio" name="precio" type="number" placeholder="precio" min="1" max="99999" required></input>
                                    <button type="submit">Editar Producto</button>
                            </div>
                                `;
                                contenedorProductos.appendChild(divContenedorProductoEditar);
                                const formEditar = document.querySelector('form');
                                formEditar.addEventListener('submit', (event) => {
                                    event.preventDefault();
                                    const idForm = formEditar.elements.id.value;
                                    const nombreForm = formEditar.elements.nombre.value;
                                    const categoriaForm = formEditar.elements.categoria.value;
                                    const precioForm = formEditar.elements.precio.value;
                                    const imagenForm = formEditar.elements.imagen.value;
                                    const productoEditado={
                                        "id": idForm,
                                        "categoria": categoriaForm,
                                        "nombre": nombreForm,
                                        "imagen": imagenForm,
                                        "precio": precioForm
                                    };
                                    const index = data.productos.indexOf(productoAeditarEncontrado);
                                    data.productos.splice(index, 1, productoEditado);
                                    actualizarArchivoJSON(data);
                                });

                            }else{
                                console.log('no se encontro el producto');
                            }
                        });
                    };
                })
            });
    });
}

function actualizarArchivoJSON(datos) {
    const datosJSON = JSON.stringify(datos);
  
    // Utiliza fetch con el método POST o PUT para enviar los datos actualizados al archivo JSON local
    fetch('db.json', {
      method: 'POST', // O utiliza 'PUT' dependiendo de tus necesidades
      headers: {
        'Content-Type': 'application/json'
      },
      body: datosJSON
    }).then(response => {
      if (response.ok) {
        console.log('Datos actualizados correctamente');
      } else {
        console.error('Error al actualizar el archivo JSON');
      }
    }).catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
  }