document.addEventListener("DOMContentLoaded", function () {
    cargarCarrito();
    actualizarContadorCarrito();
});

function cargarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    const tabla = document.getElementById("tabla-carrito");
    const botonVaciar = document.getElementById("vaciar-carrito");
    const mensajeVacio = document.getElementById("mensaje-vacio");
    const totalElemento = document.getElementById("total-carrito");
    const totalContainer = document.querySelector(".total-carrito");
    const botonFinalizar = document.getElementById("finalizar-compra");


    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Si el carrito está vacío
    if (carrito.length === 0) {

        tabla.style.display = "none";
        botonVaciar.style.display = "none";
        botonFinalizar.style.display = "none";
        totalContainer.style.display = "none";

        mensajeVacio.style.display = "flex";

        totalElemento.textContent = "$0";

        actualizarContadorCarrito();

        return;
    }

    // Si hay productos
    tabla.style.display = "table";
    botonVaciar.style.display = "inline-block";
    mensajeVacio.style.display = "none";

    let totalCarrito = 0;

    for (let i = 0; i < carrito.length; i++) {

        const producto = carrito[i];

        const tr = document.createElement("tr");

        // Nombre
        const tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;

        // Precio
        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = "$" + producto.precio.toLocaleString("es-AR");

        // Cantidad
        const tdCantidad = document.createElement("td");
        tdCantidad.textContent = producto.cantidad;

        // Subtotal
        const subtotal = producto.precio * producto.cantidad;

        const tdSubtotal = document.createElement("td");
        tdSubtotal.textContent = "$" + subtotal.toLocaleString("es-AR");

        // Sumar al total
        totalCarrito += subtotal;

        // Acciones
        const tdAcciones = document.createElement("td");

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        btnEliminar.addEventListener("click", function () {

            if (carrito[i].cantidad > 1) {
                carrito[i].cantidad--;
            } else {
                carrito.splice(i, 1);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            cargarCarrito();
            actualizarContadorCarrito();
        });

        tdAcciones.appendChild(btnEliminar);

        // Agregar celdas
        tr.appendChild(tdNombre);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdSubtotal);
        tr.appendChild(tdAcciones);

        listaCarrito.appendChild(tr);
    }

    // Mostrar total
    totalElemento.textContent = "$" + totalCarrito.toLocaleString("es-AR");
}

function actualizarContadorCarrito() {

    const contador = document.getElementById("contador-carrito");

    // Si la página no tiene el contador, salir
    if (!contador) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let cantidadTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        cantidadTotal += carrito[i].cantidad;
    }

    contador.textContent = cantidadTotal;
}

// Vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", function () {

    localStorage.removeItem("carrito");

    cargarCarrito();
    actualizarContadorCarrito();

    modal.classList.add("activo");
});

// Modal para vaciar carrito y finalizar compra 
const modal = document.getElementById("modal");
const modalCompra = document.getElementById("modal-compra");
const cerrarModal = document.getElementById("cerrarModal");
const cerrarModalCompra = document.getElementById("cerrarModalCompra");

// Cerrar modal 
cerrarModal.addEventListener("click", function () {
    modal.classList.remove("activo");
});

modal.addEventListener("click", function (event) {

    if(event.target === modal){
        modal.classList.remove("activo");
    }

});

// Botón finalizar compra
document.getElementById("finalizar-compra").addEventListener("click", function () {
    modalCompra.classList.add("activo");
});

cerrarModalCompra.addEventListener("click", function () {
    modalCompra.classList.remove("activo");
});

modalCompra.addEventListener("click", function (event) {

    if(event.target === modalCompra){
        modalCompra.classList.remove("activo");
    }

});