let allPokemons = [];
let pageOffset = 0;

async function init() {
    const baseData = await fetchBasePokemons();
    await fetchBaseDataPokemons(baseData);
    renderBaseCardPokemons();
}

async function fetchBasePokemons() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageOffset}&limit=20`);
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
    const newPokemons = await Promise.all(promises);
    for (let i = 0; i < newPokemons.length; i++) {
        allPokemons.push(newPokemons[i]);
    }
}

function renderBaseCardPokemons() {
    const container = document.getElementById('pokemon-list');
    container.innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        const pokemon = allPokemons[i];
        container.innerHTML += getBaseCardTemplate(pokemon);
    }
}

async function loadMorePokemons() {
    pageOffset += 20;
    const baseData = await fetchBasePokemons();
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

    const newPokemons = await Promise.all(promises);
        for (let i = 0; i < newPokemons.length; i++) {
            allPokemons.push(newPokemons[i]);
        }
        const container = document.getElementById('pokemon-list');
        for (let i = 0; i < newPokemons.length; i++) {
            container.innerHTML += getBaseCardTemplate(newPokemons[i]);
        }
};

async function loadMorePokemons() {
    pageOffset += 20;
    const baseData = await fetchBasePokemons();
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
    const newPokemons = await Promise.all(promises);
    for (let i = 0; i < newPokemons.length; i++) {
        allPokemons.push(newPokemons[i]);
    }
    const container = document.getElementById('pokemon-list');
    for (let i = 0; i < newPokemons.length; i++) {
        container.innerHTML += getBaseCardTemplate(newPokemons[i]);
    }
}