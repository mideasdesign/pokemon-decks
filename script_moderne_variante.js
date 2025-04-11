let allPokemons = [];
let pokemonSpecies = [];
let pageOffset = 0;

async function init() {
    const baseData = await fetchBasePokemons();
    await fetchBaseDataPokemons(baseData);
    renderBaseCardPokemons();
};

async function fetchBasePokemons() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageOffset}&limit=12`);
        const data = await response.json();
        console.log(data);
        return data.results;
    } catch (error) {
        console.error('Error loading base data:', error);
    }
};

async function fetchBaseDataPokemons(baseData) {
    const promises = baseData.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const detail = await response.json();
        return {
            name: detail.name,
            image: detail.sprites.other["official-artwork"].front_default,
            types: detail.types.map(pkmst => pkmst.type.name),
            abilities: detail.abilities.map(pkmsa => pkmsa.ability.name),
            id: detail.id,
        };
    });
    const newPokemons = await Promise.all(promises);
    allPokemons.push(...newPokemons);
};

function renderBaseCardPokemons() {
    document.getElementById('spinner').classList.remove('hide');
    const container = document.getElementById('pokemon-list');
    container.innerHTML = ''; 
    allPokemons.forEach(pokemon => {
        container.innerHTML += getBaseCardTemplate(pokemon);
        document.getElementById('spinner').classList.add('hide');  
    });
};

async function loadMorePokemons() {
    document.getElementById('spinner').classList.remove('hide');
    pageOffset += 20;
    const baseData = await fetchBasePokemons();
    const promises = baseData.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const detail = await response.json();
        return {
            name: detail.name,
            image: detail.sprites.other["official-artwork"].front_default,
            types: detail.types.map(pkmst => pkmst.type.name),
            abilities: detail.abilities.map(pkmsa => pkmsa.ability.name),
            id: detail.id,
        };
    });
    let newPokemons = await Promise.all(promises);
    allPokemons.push(...newPokemons);
    let container = document.getElementById('pokemon-list');
    newPokemons.forEach(pokemon => {
        container.innerHTML += getBaseCardTemplate(pokemon);  
        document.getElementById('spinner').classList.add('hide');
    });
};

async function fetchPokemonSpecies(id) {
   document.getElementById('spinner').classList.remove('hide');
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        let species = await response.json();
        let pokemon = allPokemons.find(pkms => pkms.id == id);
        let modal = document.getElementById('pokemon-modal');
        let detailContainer = document.getElementById('detail-card');
        detailContainer.innerHTML = getDetailedCardTemplate(pokemon, species);
        document.getElementById('spinner').classList.add('hide'); 
        modal.classList.remove('close');
        console.log(species);
    } catch (error) {
        console.error('Error loading species data:', error);
    }
};

    function searchPokemons() {
        const searchRef = document.getElementById('search-input').value.toLowerCase().trim();
        const container = document.getElementById('pokemon-list');
        if (searchRef.length < 3) {
            container.innerHTML = '';
            renderBaseCardPokemons();
            return;
        }
        const filtered = allPokemons.filter(pkm => pkm.name.startsWith(searchRef));
        container.innerHTML = '';
        if (filtered.length > 0) {
            filtered.forEach(pokemon => {
                container.innerHTML += getBaseCardTemplate(pokemon);
            });
        } else {
            container.innerHTML = `<p class="text-gray-700 text-xl">No Pokémon found.</p>`;
        }
    }

async function fetchPokemonDataAndRender(id) {
    document.getElementById('spinner').classList.remove('hide');
    try {
        const pokemon = await fetchPokemonDetail(id);
        const species = await fetchPokemonSpeciesDetail(id);
        renderPokemonDetailCard(pokemon, species);
        document.getElementById('spinner').classList.add('hide'); 
    } catch (error) {
        console.error('Error loading Pokémon data:', error);
    }
};

async function fetchPokemonDetail(id) {
    document.getElementById('spinner').classList.remove('hide');
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    document.getElementById('spinner').classList.add('hide'); 
    return {
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        types: data.types.map(t => t.type.name),
        abilities: data.abilities.map(a => a.ability),
        id: data.id,
    };
    
};

async function fetchPokemonSpeciesDetail(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return await response.json();
};

function renderPokemonDetailCard(pokemon, species) {
    document.getElementById('spinner').classList.remove('hide');
    const container = document.getElementById('detail-card');
    container.innerHTML = getDetailedCardTemplate(pokemon, species)
}

function modalOverlay(event){
    let toggleRef = document.getElementById('pokemon-modal');
    toggleRef.classList.toggle('close');
  };