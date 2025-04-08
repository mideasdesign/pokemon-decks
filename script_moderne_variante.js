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
    fetchBaseDataPokemons(data.results); // Array mit { name, url }
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
    allPokemons.push(...newPokemons);
}

function renderBaseCardPokemons() {
    const container = document.getElementById('pokemon-list');
    container.innerHTML = ''; // Beim ersten Laden Liste leeren
    allPokemons.forEach(pokemon => {
        container.innerHTML += getBaseCardTemplate(pokemon);
    });
}

async function loadMorePokemons() {
/*     if (pageOffset >= 100) return; */

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
    allPokemons.push(...newPokemons);

    const container = document.getElementById('pokemon-list');
    newPokemons.forEach(pokemon => {
        container.innerHTML += getBaseCardTemplate(pokemon);
    });
};

async function fetchPokemonSpecies() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species?offset=${pageOffset}&limit=2`);
    const speciesData = await response.json();
    fetchPokemonSpeciesData(speciesData.results); // Array mit { name, url }
};

async function fetchPokemonSpeciesData(speciesData) {
    const speciesPromises = speciesData.map(async (species) => {
        const response = await fetch(species.url);
        const speciesDetail = await response.json();
        return {
            name: speciesDetail.name,
            egg_groups: speciesDetail.egg_groups.map(seg => seg.name),
            growth_rate: speciesDetail.name,
            habitat: speciesDetail.habitat?.name || 'unkown',
            id: speciesDetail.id,
        };
    });
    const newPokemonsSpecies = await Promise.all(speciesPromises);
    for (let indexNewPokemonsSpecies = 0; indexNewPokemonsSpecies < newPokemonsSpecies.length; indexNewPokemonsSpecies++) {
        allPokemons.push(newPokemonsSpecies[indexNewPokemonsSpecies]);
    }
};

function renderDetailedCardPokemons() {
    const speciesContainer = document.getElementById('detail-card');
    for (let indexSpecies = 0; indexSpecies < pokemonSpecies.length; indexSpecies++) {
        const species = pokemonSpecies[indexSpecies];
        speciesContainer.innerHTML += getDetailedCardTemplate(species);
    }
}

function modalOverlay(event){
    let toggleRef = document.getElementById('pokemon-modal')
    toggleRef.classList.toggle('close');
  };
