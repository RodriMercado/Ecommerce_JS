const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    const errorNombre = document.getElementById("errorNombre");
    const errorEmail = document.getElementById("errorEmail");
    const errorMensaje = document.getElementById("errorMensaje");

    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorMensaje.textContent = "";

    let valido = true;

    // Validaciones y Errores
    if (nombre.value.trim() === "") {
        errorNombre.textContent = "Por favor, ingrese un nombre";
        valido = false;
    }

    if (email.value.trim() === "") {
        errorEmail.textContent = "Por favor, ingrese un email";
        valido = false;
    } else {
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValido.test(email.value)) {
            errorEmail.textContent = "Por favor, escribe un correo electrónico válido";
            valido = false;
        }
    }
    
    if (mensaje.value.trim() === "") {
        errorMensaje.textContent = "Por favor, escriba su mensaje";
        valido = false;
    }

    // Enviar formulario
    if (valido) {
        form.submit();
    }
});
