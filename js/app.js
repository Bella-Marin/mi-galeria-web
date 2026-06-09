const galeria = document.getElementById("galeria");
const boton = document.getElementById("cargar");
const buscador = document.getElementById("buscar");

let paises = [];

async function cargarDatos() {

    galeria.innerHTML = "<p>Cargando países...</p>";

    try {

        const respuesta = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,flags,capital,population"
        );

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}`);
        }

        paises = await respuesta.json();

        mostrarPaises(paises);

    } catch (error) {

        galeria.innerHTML =
            "<p>Error al cargar los datos.</p>";

        console.error(error);
    }
}

function mostrarPaises(lista) {

    galeria.innerHTML = "";

    lista.forEach(pais => {

        if (!pais.name || !pais.flags) return;

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `
            <img src="${pais.flags.png}"
                 alt="Bandera de ${pais.name.common}">

            <h3>${pais.name.common}</h3>

            <p><strong>Capital:</strong>
            ${pais.capital?.[0] || "No disponible"}</p>

            <p><strong>Población:</strong>
            ${pais.population.toLocaleString()}</p>
        `;

        galeria.appendChild(tarjeta);
    });
}

buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase();

    const filtrados = paises.filter(pais =>
        pais.name.common.toLowerCase().includes(texto)
    );

    mostrarPaises(filtrados);
});

boton.addEventListener("click", cargarDatos);