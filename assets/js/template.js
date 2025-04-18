function getBaseCardTemplate(pokemon) {
    return /* html */`
        <div class="monster-scalup z-[1] grid gap-4 border rounded-2xl border-gray-200 shadow-lg p-2  hover:cursor-pointer" onclick="fetchPokemonSpecies(${pokemon.id})">
            <div class="rounded-2xl px-3 grid grid-cols-1 justify-between py-8 ${pokemon.types[0]} hover:cursor-pointer">  
                <img src="${pokemon.image}" alt="${pokemon.name}" class="place-self-center">
                <div class="flex flex-col justify-between items-center">
                    <h3 class="text-xl sm:text-lg md:text-lg text-gray-800 text-center uppercase">${pokemon.name}</h3>
                    <p class="text-base[length:--text-base] text-gray-800 text-center">Typ: ${pokemon.types.join(', ')}</p>
                </div>
            </div>  
        </div>
    `;
}

function getSearchCardTemplate(pokemon) {
    return /* html */`
        <div class="monster-scalup z-[1] grid gap-4 border rounded-2xl border-gray-200 shadow-lg p-2  hover:cursor-pointer" onclick="fetchPokemonSpecies(${pokemon.id})">
            <div class="rounded-2xl px-3 grid grid-cols-1 justify-between py-8 ${pokemon.types[0]} hover:cursor-pointer">  
                <img src="${pokemon.image}" alt="${pokemon.name}" class="place-self-center">
                <div class="flex flex-col justify-between items-center">
                    <h3 class="text-xl sm:text-lg md:text-lg text-gray-800 text-center">${pokemon.name}</h3>
                    <p class="text-base[length:--text-base] text-gray-800 text-center">Typ: ${pokemon.types.join(', ')}</p>
                </div>
            </div>  
        </div>
    `;
}

function getDetailedCardTemplate(pokemon, species) {
    const prevDisabled = pokemon.id <= 1 ? 'disabled hidden cursor-not-allowed' : '';
    const nextDisabled = pokemon.id >= 1302 ? 'disabled opacity-50 cursor-not-allowed' : '';
    const entry = species.flavor_text_entries.find(lang => lang.language.name === "en");
    const flavorText = entry ? entry.flavor_text.replace(/\n|\f/g, ' ') : "No description available.";
    return /* html */`
        <div class="z-[0] grid grid-cols-0 gap-2 p-2 items-center justify-center rounded-2xl text-gray-800 ${pokemon.types[0]}">
            <div class="items-center grid grid-cols-3 justify-between">
                <span class="text-xl uppercase col-span-2">${species.name} </span>
                <span class="text-lg pt-1 sm:pt-0 justify-self-end">#${species.id}</span>  
            </div>
            <img src="${pokemon.image}" alt="${pokemon.name}" class=" w-36 h-auto place-self-center sm:h-72 sm:w-auto">
            <div class="bg-gray-200 rounded-2xl p-2 sm:p-4">
                <h4 class="text-base my-1 sm:my-5 sm:text-lg wrap-break-word">${flavorText}</h4>
                <div class="grid grid-cols-2 justify-between gap-5 text-gray-800 break-normal wrap-break-word text-base sm:text-base">
                    <div class=""><span>generation: <span class=" text-gray-800 wrap-break-word">${species.generation.name}</span></div>
                    <div class=""><span>abilities:</span> <span class=" text-gray-800 wrap-break-word">${pokemon.abilities.join(', ')}</span></div>
                    <div class=""><span>egg group:</span> <span class=" text-gray-800 wrap-break-word">${species.egg_groups.map(egg => egg.name).join(', ')}</span></div>
                    <div class=""><span>growth rate:</span>  <span class=" text-gray-800 wrap-break-word">${species.growth_rate.name}</span></div>
                    <div class=""><span>habitat: </span> <span class=" text-gray-800 wrap-break-word">${species.habitat.name}</span></div>
                </div>
            </div>
            <div id="pagination" class="flex justify-between">
            <button id="prevPkm" onclick="fetchPokemonDataAndRender(${pokemon.id -1})" class="text-xl pl-4 text-gray-800 hover:animate-pulse hover:cursor-pointer ${prevDisabled}"> < </button>
            &nbsp; <button id="nextPkm" onclick="fetchPokemonDataAndRender(${pokemon.id + 1})" class="items-end text-xl pr-4 text-gray-800 hover:animate-pulse hover:cursor-pointer ${nextDisabled}">&gt;</button>
            </div>
        </div>
    `;
}