;(function(){
    "use strict"
    const main = document.getElementById('main');
    const articleFirst = document.createElement("section");
    
    //criando a OL
    const pokemonList = document.createElement('ol');
    pokemonList.id="pokemonList";
    pokemonList.className="pokemons";

    //criando o botão para exibir mais pokemons
    const butao = document.createElement("button")
    butao.id = "loadMoreButton";
    butao.type = "button";
    butao.textContent = "Load More";

    //variáveis para definir os limites
    const maxRecords = 200;
    const limit = 10;
    let offset = 0;
    let arrPokemon = [];
    
    function vincArticle(lo){
        const div = document.createElement("div");
        div.className = "pagination";
        
        div.appendChild(butao);

        articleFirst.appendChild(lo);
        articleFirst.appendChild(div);
        main.appendChild(articleFirst);
    }

    vincArticle(pokemonList)

    function addLiPokemon(li){
        arrPokemon.push(li)
    }

    function addPokemom(pokemon){
        const li = document.createElement("li")
        li.className = `pokemon ${pokemon.type}`
        li.id = `${pokemon.number}`

        const span = document.createElement("span")
        span.className = "number"
        span.textContent = `${pokemon.number}`
        li.appendChild(span)
        
        const span2 = document.createElement("span")
        span2.className = "name"
        span2.textContent = `${pokemon.name}`
        li.appendChild(span2)
        
        const div = document.createElement("div")
        div.className = "detail"
            div.appendChild(addLiTypes(pokemon))
        
            const img =document.createElement("img")
            img.src = `${pokemon.photo}`
            img.alt = `${pokemon.name}`
            div.appendChild(img)
        li.appendChild(div)
        detPokemonClick(li)

        return li
    };
    
    function detPokemonClick(e){
        e.addEventListener("click", function(){
            expandPok(e.id)
        })
    }

    function renderizarPokemon(){
        pokemonList.innerHTML = ""
        arrPokemon.forEach(e => {
            pokemonList.appendChild(addPokemom(e))
        })
    }
    function addLiTypes(e){
        const ol = document.createElement("ol")
        ol.className = "types"
        
        let i = 0
        while(i < e.types.length){
            const liType = document.createElement("li")
            let type = e.types[i];
            liType.className = `type ${type}`;
            liType.textContent = `${type}`;
            ol.appendChild(liType);
            i++;
        }
        return ol
    };
    
    function loadPokemonItens(offset, limit) {
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            pokemons.map((pokemon) => addLiPokemon(pokemon))
            renderizarPokemon()
        })
    };
    
    function expandPok(e){
        e = e-1
        pokeApi.getPokemons(e, 1).then((pokemons = []) => {
            pokemons.map((pokemon) => detCardPokemon(pokemon))
        })
    }

    loadPokemonItens(offset, limit)
    
    butao.addEventListener('click', () => {
        offset += limit
        const qtdRecordsWithNexPage = offset + limit
        
        if (qtdRecordsWithNexPage >= maxRecords){
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit)
            
            butao.parentElement.removeChild(butao)
        } else {
            loadPokemonItens(offset, limit)
            renderizarPokemon()
        }
    });
    
    function detCardPokemon(jsonPok){

        const articleCard1 = document.createElement("article");
        
        const buttonBack = document.createElement("button");
        buttonBack.id = "botao";
        buttonBack.textContent = "Back";
        buttonBack.addEventListener("click", () => {
            main.appendChild(articleFirst);
            articleCard1.parentElement.removeChild(articleCard1);
            articleCard2.parentElement.removeChild(articleCard2);
        })
        articleCard1.appendChild(buttonBack);
        articleCard1.appendChild(detalharPokemon1(jsonPok));
        
        main.appendChild(articleCard1);

        const articleCard2 = document.createElement("article");
        articleCard2.className = "informs";

        articleCard2.appendChild(detalharPokemon2(jsonPok));
        
        main.appendChild(articleCard2)
        articleFirst.parentElement.removeChild(articleFirst);
    }

    function detalharPokemon1(jsonPok){
        const header = document.createElement("header")
        header.className = `pokemon2 ${jsonPok.type}`
       
        const span = document.createElement("span")
        span.className = "number"
        span.textContent = `${jsonPok.number}`
        header.appendChild(span)
        
        const span2 = document.createElement("span")
        span2.className = "name"
        span2.textContent = `${jsonPok.name}`
        header.appendChild(span2)
        
        const div2 = document.createElement("div")
        div2.className = "detail"
        div2.appendChild(addLiTypes(jsonPok))
        
        const img =document.createElement("img")
        img.src = `${jsonPok.photo}`
        img.alt = `${jsonPok.name}`
        div2.appendChild(img)
        
        // Medidas
        const divMedidas = document.createElement("div")
        divMedidas.className = "medidas"

        const h3Med = document.createElement("h3")
        h3Med.textContent = "Medidas"
        divMedidas.appendChild(h3Med)
        const spanM = document.createElement("span")
        spanM.className = "medida"
        spanM.textContent = `Peso: ${jsonPok.weight/10}Kg`
        divMedidas.appendChild(spanM)

        const spanM2 = document.createElement("span")
        spanM2.className = "medida"
        spanM2.textContent = `Altura: ${jsonPok.height/10}m`
        divMedidas.appendChild(spanM2)

        div2.appendChild(divMedidas)
        
        header.appendChild(div2)

        return header
    };

    function detalharPokemon2(pokemon){
        const section = document.createElement("section")
        section.className = `pokemonDet`

        // Informs
        const divInfs = document.createElement("div")
        divInfs.className = "medidas"
        
        const h3Infs = document.createElement("h3")
        h3Infs.textContent = "Informações"
        divInfs.appendChild(h3Infs)
        const spanI = document.createElement("span")
        spanI.className = "medida"
        spanI.textContent = `Base Exp.: ${pokemon.base_experience}`
        divInfs.appendChild(spanI)
        const pInfs = document.createElement("p")
        pInfs.textContent = "Habilidades:"
        divInfs.appendChild(pInfs)
        const spanI2 = document.createElement("span")
        spanI2.className = "medida"
        spanI2.textContent = `- ${pokemon.abilities[0]}`
        const spanI3 = document.createElement("span")
        spanI3.className = "medida"
        spanI3.textContent = `- ${pokemon.abilities[1]}`        
        divInfs.appendChild(spanI2)        
        divInfs.appendChild(spanI3)
        
        section.appendChild(divInfs)

        // stats
        const divStats = document.createElement("div")
        divStats.className = "medidas"
        
        const h3Stats = document.createElement("h3")
        h3Stats.textContent = "Stats"
        divStats.appendChild(h3Stats)
        const spanS = document.createElement("span")
        spanS.className = "medida"
        spanS.textContent = `${pokemon.stats_name[0]} - ${pokemon.stats_base[0]}`
        divStats.appendChild(spanS)

        const spanS2 = document.createElement("span")
        spanS2.className = "medida"
        spanS2.textContent = `${pokemon.stats_name[1]} - ${pokemon.stats_base[1]}`
        divStats.appendChild(spanS2)

        const spanS3 = document.createElement("span")
        spanS3.className = "medida"
        spanS3.textContent = `${pokemon.stats_name[2]} - ${pokemon.stats_base[2]}`
        divStats.appendChild(spanS3)
        
        const spanS4 = document.createElement("span")
        spanS4.className = "medida"
        spanS4.textContent = `${pokemon.stats_name[3]} - ${pokemon.stats_base[3]}`
        divStats.appendChild(spanS4)

        const spanS5 = document.createElement("span")
        spanS5.className = "medida"
        spanS5.textContent = `${pokemon.stats_name[4]} - ${pokemon.stats_base[4]}`
        divStats.appendChild(spanS5)

        section.appendChild(divStats)
        
        // moves
        const divMove = document.createElement("div")
        divMove.className = "medidas"
        
        const h3Mv = document.createElement("h3")
        h3Mv.textContent = "Moves"
        divMove.appendChild(h3Mv)
        const spanMv = document.createElement("span")
        spanMv.className = "medida"
        spanMv.textContent = `${pokemon.moves[0]}`
        divMove.appendChild(spanMv)

        const spanMv2 = document.createElement("span")
        spanMv2.className = "medida"
        spanMv2.textContent = `${pokemon.moves[1]}`
        divMove.appendChild(spanMv2)

        const spanMv3 = document.createElement("span")
        spanMv3.className = "medida"
        spanMv3.textContent = `${pokemon.moves[2]}`
        divMove.appendChild(spanMv3)
        
        const spanMv4 = document.createElement("span")
        spanMv4.className = "medida"
        spanMv4.textContent = `${pokemon.moves[3]}`
        divMove.appendChild(spanMv4)

        section.appendChild(divMove)

        return section
    };
})()