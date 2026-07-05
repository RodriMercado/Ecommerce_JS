// Menu hamburguesa
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");
const menu = document.getElementById("menu");

abrir.addEventListener("click", () => {
    menu.classList.add("nav-visible");
});

cerrar.addEventListener("click", () => {
    menu.classList.remove("nav-visible");
});