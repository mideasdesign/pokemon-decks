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
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageOffset}&limit=20`);
        const data = await response.json();
        console.log(data);
        return data.results; // Array mit { name, url }
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }
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

    const newPokemons = await Promise.all(promises);
    allPokemons.push(...newPokemons);
    const container = document.getElementById('pokemon-list');
    newPokemons.forEach(pokemon => {
        container.innerHTML += getBaseCardTemplate(pokemon);
    });
};

async function fetchPokemonSpecies(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        const species = await response.json();
        const pokemon = allPokemons.find(p => p.id === id);
        const modal = document.getElementById('pokemon-modal');
        const detailContainer = document.getElementById('detail-card');
        detailContainer.innerHTML = getDetailedCardTemplate(pokemon, species);
        modal.classList.remove('close');
        console.log(species);
    } catch (error) {
        console.error('Fehler beim Laden der Spezies-Daten:', error);
    }
}

function closeModal(event) {
    document.getElementById('pokemon-modal').classList.add('close');
}
function modalOverlay(event){
    let toggleRef = document.getElementById('pokemon-modal')
    toggleRef.classList.toggle('close');
  };
