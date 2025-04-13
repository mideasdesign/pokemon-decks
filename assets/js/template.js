function getBaseCardTemplate(pokemon) {
    return /* html */`
        <div class="monster-scalup z-[0] card grid gap-4 border rounded-2xl border-gray-200 shadow-lg p-2  hover:cursor-pointer" onclick="fetchPokemonSpecies(${pokemon.id})">
        <div class="rounded-2xl px-3 py-8 ${pokemon.types[0]} hover:cursor-pointer">  
                <img src="${pokemon.image}" alt="${pokemon.name}" class="place-self-center">
                <div class="flex flex-col justify-between items-center">
                    <h3 class="font-2 text-gray-800 text-center">${pokemon.name}</h3>
                    <p class="font-0 text-gray-800 text-center">Typ: ${pokemon.types.join(', ')}</p>
                </div>
            </div>  
        </div>
    `;
}

function getDetailedCardTemplate(pokemon, species) {
const entry = species.flavor_text_entries.find(lang => lang.language.name === "en");
    const flavorText = entry ? entry.flavor_text.replace(/\n|\f/g, ' ') : "No description available.";
    return /* html */`
        <div class="z-[0] card grid grid-cols-0 gap-2 p-3 items-center justify-center rounded-2xl text-gray-800 ${pokemon.types[0]}">
            <div class="flex justify-between">
                <span class="font-3">${species.name} </span>
                <span class="font-2">#${species.id}</span>  
            </div>
                <img src="${pokemon.image}" alt="${pokemon.name}" class=" place-self-center w-full h-auto sm:h-72 sm:w-auto">
            <div class="bg-gray-200 rounded-2xl p-2 sm:p-4">
                <h4 class="font-0 my-5 sm:font-2 wrap-break-word">${flavorText}</h4>
                <div class="grid grid-cols-2 justify-between gap-5 text-gray-800 break-normal wrap-break-word">
                    <h4 class="font-0 sm:font-2">generation:</h4> <span class="font-0 sm:font-2 text-gray-800 wrap-break-word">${species.generation.name}</span>
                    <h4 class="font-0 sm:font-2">abilities:</h4> <span class="font-0 sm:font-2 text-gray-800 wrap-break-word">${pokemon.abilities}</span>
                    <h4 class="font-0 sm:font-2">egg group:</h4> <span class="font-0 sm:font-2 text-gray-800 wrap-break-word">${species.egg_groups.map(egg => egg.name).join(', ')}</span>
                    <h4 class="font-0 sm:font-2">growth rate:</h4> <span class="font-0 sm:font-2 text-gray-800 wrap-break-word">${species.growth_rate.name}</span>
                    <h4 class="font-0 sm:font-2 font">habitat:</h4> <span class="font-0 sm:font-2 text-gray-800 wrap-break-word">${species.habitat.name}</span>
                </div>
            </div>
            <div id="pagination" class="flex justify-between">
                <button id="prevPkm" onclick="fetchPokemonDataAndRender(${pokemon.id - 1})" class="font-4 md:font-5 text-gray-800 hover:cursor-pointer"> < </button> <button class="font-4 sm:text-4xl text-gray-800 hover:cursor-pointer" onclick="fetchPokemonDataAndRender(${pokemon.id + 1})" id="nextPkm"> > </button>
            </div>
        </div>
    `;
}