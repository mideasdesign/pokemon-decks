function getBaseCardTemplate(pokemon) {
    return /* html */`
        <div class="card grid gap-4 border rounded-2xl  shadow-lg p-5 ${pokemon.types[0]}" onclick="fetchPokemonSpecies(${pokemon.id})">
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
        <div class="card grid grid-cols-0 gap-4 p-5 rounded-2xl text-gray-800 ${pokemon.types[0]}">
            <h3 class="text-4xl sm:text-2xl">#${species.id}  ${species.name} </h3>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <div>
                <h4 class="text-4xl my-5 sm:text-2xl">${species.flavor_text_entries[0].flavor_text}</h4>
                <div class="grid grid-cols-2 justify-between gap-5 text-gray-700">
                    <h4 class="text-4xl sm:text-2xl">egg group:</h4> <span class="text-2xl text-gray-700">${species.egg_groups.map(e => e.name).join(', ')}</span>
                    <h4 class="text-4xl sm:text-2xl">growth rate:</h4> <span class="text-2xl text-gray-700">${species.growth_rate.name}</span>
                </div>
            </div>
        </div>
    `;
}