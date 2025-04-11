function getBaseCardTemplate(pokemon) {
    return /* html */`
        <div class="monster-scalup z-[0] card grid gap-4 border rounded-2xl border-gray-200 shadow-lg p-2  hover:cursor-pointer" onclick="fetchPokemonSpecies(${pokemon.id})">
        <div class="rounded-2xl p-3 ${pokemon.types[0]} hover:cursor-pointer">  
                <img src="${pokemon.image}" alt="${pokemon.name}" class="">
                <div class="flex flex-col justify-between items-center">
                    <h3 class="text-7xl sm:text-3xl text-gray-800">${pokemon.name}</h3>
                    <p class="text-5xl md:text-base text-gray-800">Typ: ${pokemon.types.join(', ')}</p>
                </div>
            </div>  
        </div>
    `;
}

function getDetailedCardTemplate(pokemon, species) {
const entry = species.flavor_text_entries.find(lang => lang.language.name === "en");
    const flavorText = entry ? entry.flavor_text.replace(/\n|\f/g, ' ') : "No description available.";
    return /* html */`
        <div class="z-[0] card grid grid-cols-0 gap-4 p-5 rounded-2xl text-gray-800 ${pokemon.types[0]}">
            <div class="flex justify-between">
                <span class="text-5xl">${species.name} </span>
                <span class="text-3xl">#${species.id}</span>  
            </div>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <div class="bg-gray-200 rounded-2xl p-4">
                <h4 class="text-4xl my-5 sm:text-2xl">${flavorText}</h4>
                <div class="grid grid-cols-2 justify-between gap-5 text-gray-800">
                    <h4 class="text-3xl sm:text-xl">generation:</h4> <span class="text-xl text-gray-800">${species.generation.name}</span>
                    <h4 class="text-3xl sm:text-xl">abilities:</h4> <span class="text-xl text-gray-800">${pokemon.abilities.map(pkmsa => pkmsa.name).join(', ')}</span>
                    <h4 class="text-3xl sm:text-xl">egg group:</h4> <span class="text-xl text-gray-800">${species.egg_groups.map(egg => egg.name).join(', ')}</span>
                    <h4 class="text-3xl sm:text-xl">growth rate:</h4> <span class="text-xl text-gray-800">${species.growth_rate.name}</span>
                    <h4 class="text-3xl sm:text-xl">habitat:</h4> <span class="text-xl text-gray-800">${species.habitat.name}</span>
                </div>
            </div>
            <div id="pagination" class="flex justify-between">
                <button id="prevPkm" onclick="fetchPokemonDataAndRender(${pokemon.id - 1})" class="text-5xl text-gray-300 hover:cursor-pointer"> < </button> <button class="text-5xl text-gray-300 hover:cursor-pointer" onclick="fetchPokemonDataAndRender(${pokemon.id + 1})" id="nextPkm"> > </button>
            </div>
        </div>
    `;
}