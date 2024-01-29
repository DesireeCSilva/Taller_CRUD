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
    `<h3>${serie.name}</h3>
    <p>${serie.genre}</p>
    <p>${serie.chapters}</p>
    <button onclick="deleteSerie('${serie.id}')">Borrar</button>
    <button onclick="modifySerie('${serie.id}')">Modificar</button>`
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

    const newSerie = {
        "name": formSerie.elements[0].value,
        "genre": formSerie.elements[1].value,
        "chapters": formSerie.elements[2].value
    };

    const result = await fetch(`http://localhost:3000/series` , {
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(newSerie),
    });
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


