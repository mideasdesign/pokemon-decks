let allPokemons = [];

async function init() {
    const baseData = await fetchBasePokemons();
    await fetchDetailedPokemons(baseData);
    renderPokemons();
}

async function fetchBasePokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100');
    const data = await response.json();
    return data.results; // Array mit { name, url }
}

async function fetchDetailedPokemons(baseData) {
    const promises = baseData.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const detail = await response.json();
        return {
            name: detail.name,
            image: detail.sprites.other["official-artwork"].front_default,
            types: detail.types.map(t => t.type.name),
            abilities: detail.abilities.map(a => a.ability.name),
            id: detail.id,
            color: detail.color,
            weight: detail.weight,
            height: detail.height,
            location:detail.location_area_encounters,

        };
    });

    allPokemons = await Promise.all(promises);
}

function renderPokemons() {
    const container = document.getElementById('pokemon-list');
    container.innerHTML = '';

    allPokemons.forEach(pokemon => {
        container.innerHTML += `
            <div class="card" onclick="showDetails(${pokemon.id})">
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <h3>${pokemon.name} - ${pokemon.stats}</h3>
                <p> ${pokemon.color}</p>
                <p>Typ: ${pokemon.types.join(', ')}</p>
                <p>location: ${pokemon.location} </p>
                <p>weight: ${pokemon.weight}</p>
                <p>height: ${pokemon.height}</p>

            </div>
        `;
    });
}

function showDetails(id) {
    const pokemon = allPokemons.find(p => p.id === id);
    alert(`Details zu ${pokemon.name}\nFähigkeiten: ${pokemon.abilities.join(', ')}`);
}