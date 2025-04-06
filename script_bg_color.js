let allFruits = []; // Globale Variable
let allPkms = [{
    name:"pkm1",
    type:"grass",
},
{
    name:"pkm2",
    type:"fire",
}
];
function renderNames() {
    for (let index = 0; index < allPkms.length; index++) {
        document.getElementById('all-fruits').innerHTML += `<h3 class"${allPkms[index].type}">${allPkms[index].name}</h3>`
        
    }
}


/* async function fetchDataJson() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
    const responseAsJson = await response.json();
    allPokemons = responseAsJson;
    console.log(response);
     // Nur hier gespeichert, nicht zurückgegeben
}

async function init() { 
    await fetchDataJson();      // Daten holen und in allFruits speichern
    renderFruits(allPokemons);    // Direkt global verwenden
}

function renderPokemons(fruits) {
    const fruitsList = document.getElementById('all-fruits');
    fruitsList.innerHTML = '';

    for (let indexPokemons = 0; indexPokemons < fruits.length; indexPokemons++) {
        const pokemon = fruits[indexPokemons];
        fruitsList.innerHTML += `<li>${pokemon.name}</li>`;
    }
} */