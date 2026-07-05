document.addEventListener("DOMContentLoaded", function () {

    const botonesAgregar = document.getElementsByClassName("carrito");

    actualizarContadorCarrito();

    for (let i = 0; i < botonesAgregar.length; i++) {

        botonesAgregar[i].addEventListener("click", function (event) {

            const boton = event.target;

            boton.innerHTML = '<i class="fa-solid fa-check"></i> Agregado';
            boton.disabled = true;

            setTimeout(() => {
                boton.innerHTML = '<i class="fa-solid fa-cart-arrow-down"></i> Añadir al carrito';
                boton.disabled = false;
            }, 1000);

            const producto = {
                id: boton.getAttribute("data-id"),
                nombre: boton.getAttribute("data-nombre"),
                precio: Number(boton.getAttribute("data-precio"))
            };

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            let productoExistente = carrito.find(item => item.id === producto.id);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                producto.cantidad = 1;
                carrito.push(producto);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            // Actualizar el número del carrito
            actualizarContadorCarrito();

        });
    }

});

function actualizarContadorCarrito() {

    const contador = document.getElementById("contador-carrito");

    if (!contador) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let cantidadTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        cantidadTotal += carrito[i].cantidad;
    }

    contador.textContent = cantidadTotal;
}