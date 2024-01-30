document.addEventListener('DOMContentLoaded', () => {
    // Al cargar el DOM, se llama a la función getSeries para mostrar la información inicial.
    printSeries();
});

// Método GET R (Read) del CRUD
async function getSeries(){
    const result = await fetch("http://localhost:3000/series")
    const data = await result.json() 
    return data
}
let sectionTag = document.getElementById("series-list")
async function printSeries(){
    let series = await getSeries()
    series.map(serie => {
    sectionTag.innerHTML += 
    `<li>${serie.name} - ${serie.genre} (${serie.chapters} capítulos)
        <button class="delete-button" onclick="deleteSerie('${serie.id}')">Borrar</button>
        <button class="modify-button" onclick="modifySerie('${serie.id}')">Modificar</button>
    </li>`;
    })
}


// Método DELETE D (Delete) del CRUD
async function deleteSerie(id){
    const result = await fetch(`http://localhost:3000/series/${id}`,
    {method: "DELETE"})
    return result
}

//Método POST C (CREATE) del CRUD con formulario

async function createSerie() {
    const formSerie = document.getElementById("series-form")

    const nameValue = formSerie.elements[0].value;
    const genreValue = formSerie.elements[1].value;
    const chaptersValue = formSerie.elements[2].value;

    // Validar el campo "name" para que acepte letras y espacios y no esté vacío.
    if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
        mostrarMensajeError('Por favor, ingrese un nombre.');
        return;
    }

    // Validar el campo "genre" para que acepte letras y espacios y no esté vacío.
    if (!/^[a-zA-Z\s]+$/.test(genreValue)) {
        mostrarMensajeError('Por favor, ingrese un género.');
        return;
    }

    // Validar el campo "chapters" para que solo acepte números.
    if (!/^\d+$/.test(chaptersValue)) {
        mostrarMensajeError('Por favor, ingrese un número de capítulos.');
        return;
    }

    const newSerie = {
        "name": nameValue,
        "genre": genreValue,
        "chapters": chaptersValue
    };

    const result = await fetch(`http://localhost:3000/series` , {
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(newSerie),
    });
}

// Función para mostrar mensajes de error
function mostrarMensajeError(mensaje) {
    alert(mensaje);
}

// Método PUT U (update) del CRUD para modificar una serie por su id

async function modifySerie(id) {
    const newSerie = prompt('Modifica el nombre de la serie');
    const newGenre = prompt('Modifica el género de la serie');
    const newChapters = prompt('Modifica el número de capítulos');

    const response = await fetch(`http://localhost:3000/series/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newSerie,
            genre: newGenre,
            chapters: newChapters,
        }),
    });
}


