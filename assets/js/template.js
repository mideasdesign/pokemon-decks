function getBaseCardTemplate(pokemon) {
    return /* html */`
        <div class="card flex border border-red-700 rounded-2xl p-5 ${pokemon.types[0]}" onclick="fetchPokemonSpecies(${pokemon.id})">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <div class="flex flex-col justify-between">
                <h3 class="text-7xl text-gray-800">${pokemon.name}</h3>
                <p class="text-5xl text-gray-800">Typ: ${pokemon.types.join(', ')}</p>
            </div>
        </div>
    `;
}

function getDetailedCardTemplate(pokemon, species) {
    return /* html */`
        <div class="card text-white">
            <h3 class="text-3xl">${species.name} - #${species.id}</h3>
            <p class="text-xl">egg group: ${species.egg_groups.map(e => e.name).join(', ')}</p>
            <p class="text-xl">description: ${species.flavor_text_entries[0].flavor_text}</p>
            <button onclick="closeModal()" class="mt-4 px-4 py-2 bg-red-600 text-white rounded">Schließen</button>
        </div>
    `;
}

function getGermanFlavorText(species) {
    const entry = species.flavor_text_entries.find(e => e.language.name === 'de');
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : 'Keine Beschreibung vorhanden.';
}