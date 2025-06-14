
function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let index = carrito.findIndex(p => p.nombre === nombre);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(nombre + " agregado al carrito.");
}

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-lista");
  const totalEl = document.getElementById("total");
  if (!contenedor) return;
  contenedor.innerHTML = "";
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nombre}</strong><br>
      Precio: $${item.precio} <br>
      Cantidad: 
        <button onclick="cambiarCantidad(${index}, -1)">-</button> 
        ${item.cantidad} 
        <button onclick="cambiarCantidad(${index}, 1)">+</button><br>
      Subtotal: $${(item.precio * item.cantidad).toFixed(2)}<br>
      <button class="boton-verde" onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    contenedor.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalEl.innerText = "Total: $" + total.toFixed(2);
}

function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function cambiarCantidad(index, delta) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito[index].cantidad += delta;
  if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem('carrito');
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
