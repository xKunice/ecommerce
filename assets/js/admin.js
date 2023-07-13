fetch('db.json')
  .then(response => response.json())
  .then(data => { 
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
                <input id="nombre" name="nombre" type="text" placeholder="nombre producto" required></input>
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
                <button type="submit">Crear Producto</button>
            </form>`;
            contenedorProductos.appendChild(divContenedor);

        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            const idForm = form.elements.id.value;
            const nombreForm = form.elements.nombre.value;
            const categoriaForm = form.elements.categoria.value;
            const precioForm = form.elements.precio.value;
            const imagenForm = form.elements.imagen.value;
            event.preventDefault();

            const nuevoProducto={
                "id": idForm,
                "categoria": categoriaForm,
                "nombre": nombreForm,
                "imagen": imagenForm,
                "precio": precioForm
            };
            data.productos.push(nuevoProducto);
            

        });
        
    });

});