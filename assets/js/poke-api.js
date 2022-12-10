
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const abilities = pokeDetail.abilities.map((hab) => hab.ability.name)
    const stats_base = pokeDetail.stats.map((inf) => inf.base_stat)
    const stats_name = pokeDetail.stats.map((inf) => inf.stat.name)
    let moves = [];
    const [type] = types;

    for (let i = 0; i < 4; i++) {
        moves.push(pokeDetail.moves[i].move.name);
    }

    pokemon.types = types
    pokemon.type = type
    pokemon.abilities = abilities
    pokemon.stats_base = stats_base
    pokemon.stats_name = stats_name
    pokemon.moves = moves

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.base_experience = pokeDetail.base_experience

    return pokemon
}

pokeApi.getPokemonDetail =(pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset=0, limit=5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((getPokemonDetails) => getPokemonDetails)
        .catch((error) => console.error(error))
}