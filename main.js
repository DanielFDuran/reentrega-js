const stockProductos = [
    {
      id: 1,
      nombre: "Cartucho EPSON, 5ml",
      cantidad: 1,
      desc: "Cartucho EPSON, imprime 300 hojas",
      precio: 1500,
      img: "img/cartucho-epson.jpg",
    },
    {
      id: 2,
      nombre: "Cartucho generico EPSON, 20ml",
      cantidad: 1,
      desc: "Cartucho generico EPSON, imprime 600 hojas",
      precio: 1500,
      img: "img/generico-epson.jpg",
    },
    {
      id: 3,
      nombre: "Cartucho HP, 5ml",
      cantidad: 1,
      desc: "Cartucho HP, imprime 300 hojas",
      precio: 1500,
      img: "img/cartucho-hp.jpg",
    },
    {
      id: 4,
      nombre: "Cartucho generico HP, 25ml",
      cantidad: 1,
      desc: "Cartucho generico HP , imprime 600 hojas",
      precio: 1000,
      img: "img/generico-hp.jpg",
    },
    {
      id: 5,
      nombre: "Resma A4",
      cantidad: 1,
      desc: "Resma A4 Boreal",
      precio: 1200,
      img: "img/rema-a4.jpg",
    },
    {
      id: 6,
      nombre: "Resma oficio",
      cantidad: 1,
      desc: "Resma Oficio Ledezma",
      precio: 1000,
      img: "img/resma-oficio.jpg",
    },
    {
      id: 7,
      nombre: "Toner generico HP",
      cantidad: 1,
      desc: "Toner generico HP, imprime 1500 hojas",
      precio: 1500,
      img: "img/toner-gene-hp.jpg",
    },
    {
      id: 8,
      nombre: "Toner HP",
      cantidad: 1,
      desc: "Toner HP, imprime 1000 hojas",
      precio: 1200,
      img: "img/toner-hp.jpg",
    },
    
  ];
  let carrito = [];
  
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
    
  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
      
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }
  
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mx-3 my-3" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });
  
  const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }
    mostrarCarrito()
  
  };
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
      });
    }
  
    if (carrito.length === 0) {
      console.log("Compra, dale");
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Vacio!</p>
      `;
    } else {
      console.log("Producto");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function eliminarProducto(id) {
    const prodId = id;
    carrito = carrito.filter((prod) => prod.id !== prodId);
    mostrarCarrito();
  }
  function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   