fetch('db.json')
   .then(response => response.json())
   .then(data => { 
      
    if (localStorage.getItem('productos')) {
        
        const productosGuardados = JSON.parse(localStorage.getItem('productos'));
        console.log(productosGuardados);
        console.log(data.productos);
        data.productos = productosGuardados;
      } else {
        // Los datos no están guardados en el localStorage
        console.log('No se encontraron productos en el localStorage');
      }

         const mirar = document.getElementById('btnMirar');
         mirar.addEventListener('click', () => {    
             const contenedorProductos = document.getElementById('ShowOption');
             contenedorProductos.innerHTML='';
             data.productos.forEach((producto) => {
                 const divContenedor = document.createElement('div'); 
                 divContenedor.classList.add('contenedor__productos');
                 divContenedor.innerHTML = `
                    <div class=card>
                     <div class="contenedor__img">
                         <img src="${producto.imagen}" alt="${producto.nombre}">
                     </div>
                     <div class="contenedor__Descripcion">
                         <h3>${producto.nombre}</h3>
                         <span>$${producto.precio}</span>
                     </div>
                     </div>`;
                 contenedorProductos.appendChild(divContenedor);
             });  
         })
         const crear = document.getElementById('btnCrear');
         crear.addEventListener('click', () => {
             const divContenedor = document.createElement('div');
             const contenedorProductos = document.getElementById('ShowOption');
             contenedorProductos.innerHTML='';
             divContenedor.classList.add('contenedor__formulario');
             divContenedor.innerHTML=`
                 <form>
                     <h3>Crear Producto</h3>
                     <label for="id">Id</label>
                     <input id="id" name="id"type="number" placeholder="id del producto" min="1" max="500" required></input>
                     <label for="nombre">Nombre</label>
                     <input id="nombre" name="nombre" type="text" placeholder="nombre producto" maxlength="20" required></input>
                     <label for="categoria">Categoria</label>
                     <select id="categoria" name="categoria">
                       <option value="marvel">Marvel</option>
                       <option value="dc">DC</option>
                       <option value="starWars">StarWars</option>
                     </select>
                     <label for="imagen">Imagen</label>
                     <input id="imagen" name="imagen" type="text" placeholder="url imagen" required></input>
                     <label for="precio">Precio</label>
                     <input id="precio" name="precio" type="number" placeholder="precio" min="1" max="99999" required></input>
                     <label for="descipcion">Descripcion</label>
                     <textarea name="descripcion"id="descripcion" maxlength="150" required></textarea>
                     <button type="submit">Crear Producto</button>
                     
                 </form>
                 <div id="error" style="color: red"></div>`;
                 contenedorProductos.appendChild(divContenedor)
             const form = document.querySelector('form');
             form.addEventListener('submit', (event) => {

                const errorMessage = document.getElementById('error');
                event.preventDefault();
                const productName = document.getElementById('nombre').value;
                const productPrice = document.getElementById('precio').value;
                const productDescription = document.getElementById('descripcion').value;

                if (productName.trim() === '' || productPrice.trim() === '' || productDescription.trim() === '') {
                    errorMessage.textContent = 'Ninguno de los campos puede estar en blanco.';
                } else if (productName.length > 20) {
                    errorMessage.textContent = 'El nombre del producto debe tener máximo 20 caracteres.';
                } else if (!/^\d+$/.test(productPrice)) {
                    errorMessage.textContent = 'El precio debe ser un número válido.';
                } else if (productDescription.length > 150) {
                    errorMessage.textContent = 'La descripción del producto debe tener máximo 150 caracteres.';
                } else {

                    const idForm = form.elements.id.value;
                    const nombreForm = form.elements.nombre.value;
                    const categoriaForm = form.elements.categoria.value;
                    const precioForm = form.elements.precio.value;
                    const imagenForm = form.elements.imagen.value;
                
                    event.preventDefault()
                    const nuevoProducto={
                        "id": idForm,
                        "categoria": categoriaForm,
                        "nombre": nombreForm,
                        "imagen": imagenForm,
                        "precio": precioForm
                    };
                    data.productos.push(nuevoProducto)
                    localStorage.setItem('productos', JSON.stringify(data.productos)); 
                    alert("Creado Correctamente");
                
                }
    
  
             })
             
         })
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
                 })
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
                             <div class="contenedor__img1">
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
                                 <select  id="categoria" name="categoria">
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
                            const selectCategoria = document.getElementById('categoria');
                            selectCategoria.value = productoAeditarEncontrado.categoria;

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
                                 localStorage.setItem('productos', JSON.stringify(data.productos)); 
                                 alert('se edito el producto correctamente')
                             })
                         }else{
                             console.log('no se encontro el producto');
                         }
                         
                     });
                 };
             })
         })
         const btnEliminarProducto = document.getElementById('btnEliminar');
         btnEliminarProducto.addEventListener('click', () => {
             const divContenedor = document.createElement('div');
             const contenedorProductos = document.getElementById('ShowOption');
             contenedorProductos.innerHTML='';
             divContenedor.classList.add('contenedor__editar');
             divContenedor.innerHTML=`
                 <h3>Eliminar Producto</h3>
                 <p>Seleccione el producto que desea Eliminar</p>
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
                             localStorage.setItem('productos', JSON.stringify(data.productos));
                             alert('Se elimino el producto recargue la pagina') 
                         }else{
                             console.log('no se encontro el producto');
                         
                        };
                     
                    });
                 };          
            });
     })


     localStorage.setItem('productos', JSON.stringify(data.productos));
     const productosGuardados = JSON.parse(localStorage.getItem('productos'));

     if (JSON.stringify(data.productos) === JSON.stringify(productosGuardados)) {
       console.log('Los productos se guardaron correctamente');
     } else {
       console.log('Los productos no se guardaron correctamente');  
     }



    });

const btnInicio = document.getElementById('Inicio');

btnInicio.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = './index.html';
});

