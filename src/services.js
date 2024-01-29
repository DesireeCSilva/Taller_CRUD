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
    <button onclick="deleteSerie('${serie.id}')">Borrar</button>`
    })
}


// Método DELETE D (Delete) del CRUD
async function deleteSerie(id){
    const result = await fetch(`http://localhost:3000/series/${id}`,
    {method: "DELETE"})
    return result
}

