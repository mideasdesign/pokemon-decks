function getBaseCardTemplate(pokemon) {
    return /* html */`
        <div class="card grid grid-cols-1 gap-4 border border-red-700 rounded-2xl p-5 ${pokemon.types[0]}" onclick="fetchPokemonSpecies(${pokemon.id})">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <div class="flex flex-col justify-between items-center">
                <h3 class="text-7xl sm:text-3xl text-gray-800">${pokemon.name}</h3>
                <p class="text-5xl md:text-base text-gray-800">Typ: ${pokemon.types.join(', ')}</p>
            </div>
        </div>
    `;
}

function getDetailedCardTemplate(pokemon, species) {
    return /* html */`
        <div class="card grid grid-cols-1 gap-4 text-gray-800">
            <h3 class="text-4xl sm:text-2xl">${species.name} - #${species.id}</h3>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <p class="text-4xl sm:text-2xl">egg group: ${species.egg_groups.map(e => e.name).join(', ')}</p>
            <p class="text-4xl sm:text-2xl">description: ${species.flavor_text_entries[0].flavor_text}</p>
        </div>
    `;
}

function getGermanFlavorText(species) {
    const entry = species.flavor_text_entries.find(e => e.language.name === 'de');
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : 'Keine Beschreibung vorhanden.';
}