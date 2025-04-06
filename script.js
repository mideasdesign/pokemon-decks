let allPokemons = [];

async function init() {
    await fetchPokemons(); // Warten, bis die Daten geladen sind
    renderPokemons();      // Danach erst rendern
}

async function fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-habitat');
    const data = await response.json();
    allPokemons = data;
    console.log(allPokemons);
}

function renderPokemons() {
    let pokemonList = document.getElementById('pokemon-list');
    
    // abilities ist ein Array
    let all = allPokemons.results;

    for (let i = 0; i < all.length; i++) {
        pokemonList.innerHTML += `<li>${all[i].name}</li>`;
    }
}
