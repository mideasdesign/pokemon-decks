function getBaseCardTemplate(pokemon){
    return /* html */`
        <div class="card" onclick="showDetails(${pokemon.id})">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h3 class="${pokemon.types[0]}">${pokemon.name} - #${pokemon.id}</h3>
            <p>Typ: ${pokemon.types.join(', ')}</p>
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