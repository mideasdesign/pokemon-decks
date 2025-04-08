function getBaseCardTemplate(pokemon){
    return /* html */`
        <div class="card grid grid-cols-2 border border-red-700 rounded-2xl p-5 ${pokemon.types[0]}" onclick="showDetails(${pokemon.id})">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <div class="flex flex-col justify-between">
                <h3 class="text-7xl text-gray-800">${pokemon.name}</h3>
                <p class="text-5xl  text-gray-800">Typ: ${pokemon.types.join(', ')}</p>
            </div>
        </div>
    `
};

function getDetailedCardTemplate(species){
    return /* html */`
        <div class="card">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h3 class="${pokemon.types[0]}">${species.name} - #${species.id}</h3>
            <p>egg_groups: ${species.egg_groups.join(', ')}</p>
            <p>description: ${species.flavor_text_entries[0].flavor_text}</p>
        </div>
    `
};

function showDetails(id) {
    const pokemon = allPokemons.find(p => p.id === id);
    alert(`Details zu ${pokemon.name}\nFähigkeiten: ${pokemon.abilities} <p> ${pokemon.statName}: ${pokemon.base}</p>`);
}