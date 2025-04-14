let allPokemons = [];
let allPokemonNames = [];
let pokemonSpecies = [];
let pageOffset = 0;

async function init() {
    await fetchAllPokemonNames();
    const baseData = await fetchBasePokemons();
    await fetchBaseDataPokemons(baseData);
    renderBaseCardPokemons();
}

async function fetchAllPokemonNames() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1310');
        const data = await response.json();
        allPokemonNames = data.results;
    } catch (error) {
        console.error('Error fetching all Pokémon names:', error);
    }
}

async function fetchBasePokemons() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageOffset}&limit=12`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error loading base data:', error);
    }
};

async function fetchBaseDataPokemons(baseData) {
    const newPokemons = await loadPokemonDetails(baseData);
    addToAllPokemons(newPokemons);
}



function renderBaseCardPokemons() {
    toggleSpinner(true);
    const container = document.getElementById('pokemon-list');
    container.innerHTML = '';
    appendPokemonsToList(allPokemons);
    toggleUIElements();
    toggleSpinner(false);
}

function toggleUIElements() {
    document.getElementById('back-to-overview').classList.add('hide-me');
    document.getElementById('more').classList.remove('hide-me');
}

function renderBaseCard(pokemon, container) {
    container.innerHTML += getBaseCardTemplate(pokemon);
}

function toggleOverviewButtons() {
    document.getElementById('back-to-overview').classList.add('hide-me');
    document.getElementById('more').classList.remove('hide-me');
}

function showSpinner(show) {
    document.getElementById('spinner').classList.toggle('hide', !show);
}

function renderSearchCardPokemons() {
    toggleSpinner(true);
    const container = document.getElementById('pokemon-list');
    container.innerHTML = '';
    appendPokemonsToList(allPokemons);
    toggleSpinner(false);
}

async function loadMorePokemons() {
    toggleSpinner(true);
    pageOffset += 20;
    const baseData = await fetchBasePokemons();
    const newPokemons = await fetchPokemonDetails(baseData);
    allPokemons.push(...newPokemons);
    appendPokemonsToList(newPokemons);
    toggleSpinner(false);
}

function appendPokemonsToList(pokemons) {
    const container = document.getElementById('pokemon-list');
    pokemons.forEach(pokemon => {
        container.innerHTML += getBaseCardTemplate(pokemon);
    });
}

async function loadPokemonDetails(baseData) {
    return await Promise.all(baseData.map(fetchSinglePokemon));
}

async function fetchSinglePokemon(pokemon) {
    const res = await fetch(pokemon.url);
    const detail = await res.json();
    return {
        name: detail.name,
        image: detail.sprites.other["official-artwork"].front_default,
        types: detail.types.map(t => t.type.name),
        abilities: detail.abilities.map(a => a.ability.name),
        id: detail.id,
    };
}

function addToAllPokemons(pokemons) {
    allPokemons.push(...pokemons);
}

function appendToGrid(pokemons) {
    const container = document.getElementById('pokemon-list');
    pokemons.forEach(pkm => container.innerHTML += getBaseCardTemplate(pkm));
}

async function fetchPokemonSpecies(id) {
    toggleSpinner(true);
    document.body.classList.add('modal-open');
    try {
        const species = await fetchPokemonSpeciesDetail(id);
        const pokemon = findPokemonById(id);
        renderSpeciesDetail(pokemon, species);
    } catch (e) {
        showSpeciesError();
    }
    toggleSpinner(false);
}

function findPokemonById(id) {
    return allPokemons.find(pkm => pkm.id == id);
}

function renderSpeciesDetail(pokemon, species) {
    const modal = document.getElementById('pokemon-modal');
    document.getElementById('detail-card').innerHTML = getDetailedCardTemplate(pokemon, species);
    modal.classList.remove('close');
}

function showSpeciesError() {
    const el = document.getElementById('pokemon-list');
    el.innerHTML = '<p class="text-center text-gray-500">No Pokémon found.</p>';
}

async function searchPokemons() {
    const searchRef = getSearchInput();
    const listContainer = document.getElementById('pokemon-list');
    if (!isValidSearch(searchRef)) return resetSearchResults(listContainer);
    toggleSpinner(true);
    const matches = findPokemonMatches(searchRef);
    if (matches.length === 0) return showNoResults(listContainer);
    const pokemons = await fetchPokemonDetails(matches.slice(0, 12));
    renderSearchResults(pokemons, listContainer);
    toggleSpinner(false);
  }
  
  function getSearchInput() {
    return document.getElementById('search-input').value.toLowerCase().trim();
  }
  
  function isValidSearch(search) {
    return search.length >= 3;
  }
  
  function resetSearchResults(listContainer) {
    listContainer.innerHTML = '';
    renderBaseCardPokemons();
  }
  
  function showNoResults(listContainer) {
    listContainer.innerHTML = '<p class="text-center text-gray-500 text-3xl">No Pokémon found.</p>';
    toggleSpinner(false);
  }
  
  function findPokemonMatches(query) {
    return allPokemonNames.filter(p => p.name.startsWith(query));
  }
  
  async function fetchPokemonDetails(pokemonList) {
    return await Promise.all(pokemonList.map(async (pkm) => {
      const res = await fetch(pkm.url);
      const detail = await res.json();
      return {
        name: detail.name,
        image: detail.sprites.other["official-artwork"].front_default,
        types: detail.types.map(t => t.type.name),
        abilities: detail.abilities.map(a => a.ability.name),
        id: detail.id,
      };
    }));
  }
  
  function renderSearchResults(pokemons, listContainer) {
    listContainer.innerHTML = '';
    pokemons.forEach(pokemon => {
      if (!allPokemons.some(p => p.id === pokemon.id)) {
        allPokemons.push(pokemon);
      }
        document.getElementById('back-to-overview').classList.remove('hide-me');
        document.getElementById('more').classList.add('hide-me');
        listContainer.innerHTML += getBaseCardTemplate(pokemon);
    });
  }
  
  function toggleSpinner(show) {
    document.getElementById('spinner').classList.toggle('hide', !show);
  }

async function fetchPokemonDataAndRender(id) {
    document.getElementById('spinner').classList.remove('hide');
    try {
        const pokemon = await fetchPokemonDetail(id);
        const species = await fetchPokemonSpeciesDetail(id);
        renderPokemonDetailCard(pokemon, species);
        document.getElementById('spinner').classList.add('hide'); 
    } catch (error) {
        let pkmsContainer = document.getElementById('pokemon-list');
        pkmsContainer.innerHTML = '<p class="text-center text-gray-500">No Pokémon found.</p>';
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
        abilities: data.abilities.map(pkmsa => pkmsa.ability.name),
        id: data.id,
    };
    
};

async function fetchPokemonSpeciesDetail(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return await response.json();
};

function renderPokemonDetailCard(pokemon, species) {
    document.getElementById('spinner').classList.remove('hide');
    const detailContainer = document.getElementById('detail-card');
    detailContainer.innerHTML = getDetailedCardTemplate(pokemon, species)
}

function modalOverlay(event){
    let toggleRef = document.getElementById('pokemon-modal');
    document.body.classList.remove('modal-open');
    toggleRef.classList.toggle('close');
  };
