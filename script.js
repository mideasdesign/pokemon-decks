let allPokemons = [];
let flavorTextRef = `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=20`

async function init() {
    const baseData = await fetchBasePokemons();
    await fetchBaseDataPokemons(baseData);

    const flavorTextData = await  fetchFlavorText();
    await fetchBaseDataPokemons(flavorTextData);
    renderBaseCardPokemons();
}

async function fetchFlaverText() {
    const response = await fetch(flavorTextRef);
    const flavorTextData = await response.json();
    return flavorTextData.results; // Array mit { name, url }
}

async function fetchFlavorTextData(flavorTextData) {
    const promises = flavorTextData.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const flavorDetail = await response.json();
        return {
            name: detail.name,
            image: detail.sprites.other["official-artwork"].front_default,
            types: detail.types.map(t => t.type.name),
            abilities: detail.abilities.map(a => a.ability.name),
            id: detail.id,
        };
    });

    allPokemons = await Promise.all(promises);
}

async function fetchBasePokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    const data = await response.json();
    return data.results; // Array mit { name, url }
}

async function fetchBaseDataPokemons(baseData) {
    const promises = baseData.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const detail = await response.json();
        return {
            name: detail.name,
            image: detail.sprites.other["official-artwork"].front_default,
            types: detail.types.map(t => t.type.name),
            abilities: detail.abilities.map(a => a.ability.name),
            id: detail.id,
        };
    });
    allPokemons = await Promise.all(promises);
}
async function fetchStatsDataPokemons(){
    const promises = baseData.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const detail = await response.json();
        return {
            base: detail.stats.map(s => s.base_stat),
            statName: detail.stats.map(s => s.name),
            id: detail.id,
        };
    });
}

async function fetchDetaildDataPokemons(baseData) {
    const promises = baseData.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const detail = await response.json();
        return {
            name: detail.name,
            image: detail.sprites.other["official-artwork"].front_default,
            base: detail.stats.map(s => s.base_stat),
            statName: detail.stats.map(s => s.name),
            abilities: detail.abilities.map(a => a.ability.name),
            id: detail.id,
            weight: detail.weight,
            height: detail.height,
        };
    });

    allPokemons = await Promise.all(promises);
}
function renderBaseCardPokemons() {
    const container = document.getElementById('pokemon-list');
    container.innerHTML = '';

    allPokemons.forEach(pokemon => {
        container.innerHTML += `
            <div class="card" onclick="showDetails(${pokemon.id})">
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <h3 class="${pokemon.types[0]}">${pokemon.name} - #${pokemon.id}</h3>
                <p> ${pokemon.statName}: ${pokemon.base}</p>
                <p>Typ: ${pokemon.types.join(', ')}</p>
            </div>
        `;
    });
}

function render

function showDetails(id) {
    const pokemon = allPokemons.find(p => p.id === id);
    alert(`Details zu ${pokemon.name}\nFähigkeiten: ${pokemon.abilities}`);
}