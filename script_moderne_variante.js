let allPokemons = [];
let pokemonSpecies = [];
let pageOffset = 0;

async function init() {
    const baseData = await fetchBasePokemons();
    await fetchBaseDataPokemons(baseData);
    renderBaseCardPokemons();
}

async function fetchBasePokemons() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageOffset}&limit=2`);
        const data = await response.json();
        console.log(data);
        return data.results;
    } catch (error) {
        console.error('Error loading base data:', error);
    }
}

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
}

function renderBaseCardPokemons() {
    const container = document.getElementById('pokemon-list');
    container.innerHTML = ''; 
    allPokemons.forEach(pokemon => {
        container.innerHTML += getBaseCardTemplate(pokemon);
    });
}

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
        
    });
    document.getElementById('spinner').classList.add('hide');
};

async function fetchPokemonSpecies(id) {
/*     document.getElementById('spinner').classList.remove('hide'); */
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        let species = await response.json();
        let pokemon = allPokemons.find(pkms => pkms.id == id);
        let modal = document.getElementById('pokemon-modal');
        let detailContainer = document.getElementById('detail-card');
        detailContainer.innerHTML = getDetailedCardTemplate(pokemon, species);
/*         document.getElementById('spinner').classList.add('hide'); */
        modal.classList.remove('close');
        console.log(species);
    } catch (error) {
        console.error('Error loading species data:', error);
    }
}

async function searchPokemons() {
    const searchRef = document.getElementById('search-input').value.toLowerCase().trim();
    try {
        const species = await fetchPokemonSpeciesData(searchRef);
        const pokemon = await fetchPokemonData(searchRef);
        showSearchedPokemonDetails(pokemon, species);
    } catch (error) {
        console.error('Error loading Pokémon data:', error);
    }
}

async function fetchPokemonSpeciesData(nameOrId) {
    const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameOrId}`);
    return await resSpecies.json();
}

async function fetchPokemonData(nameOrId) {
    const resPkms = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const data = await resPkms.json();
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        types: data.types.map(t => t.type.name),
        abilities: data.abilities.map(a => a.ability.name),
    };
}

function showSearchedPokemonDetails(pokemon, species) {
    const modal = document.getElementById('pokemon-modal');
    const detailContainer = document.getElementById('detail-card');
    detailContainer.innerHTML = getDetailedCardTemplate(pokemon, species);
    modal.classList.remove('close');
}

function prevPic (index){
    if(index > 0){
        modalWindow(index -1)
    }
    else {
            modalWindow(photos.length -1);
        }
}

function nextPic (index){
    if(index < photos.length -1){
        modalWindow(index +1);
    }
    else {
        modalWindow(0);
    }
}

function modalOverlay(event){
    let toggleRef = document.getElementById('pokemon-modal')
    toggleRef.classList.toggle('close');
  };