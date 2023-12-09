const id = new URLSearchParams(window.location.search).get("id");
const url = 'https://pokeapi.co/api/v2/pokemon/' + Number(id);
const root = document.querySelector('div.content');

(async () => {
    const pokemonDetail = await (await fetch(url)).json();

    const img = document.createElement('img');
    img.src = pokemonDetail.sprites.other['official-artwork']['front_default'];
    img.classList.add('sprite');

    const title = document.createElement('h1');
    title.textContent = pokemonDetail.name;
    title.classList.add('title');

    const types = document.createElement('div');
    types.classList.add('types');

    let strongAgainst = new Set();
    let weakAgainst = new Set();
    for(typeContainer of pokemonDetail.types) {
        console.log(typeContainer);
        const typeElem = document.createElement('span');
        typeElem.textContent = typeContainer.type.name;
        typeElem.classList.add('type');
    
        types.appendChild(typeElem);

        const strongAgainstData = await (await fetch(typeContainer.type.url)).json();
        strongAgainst = strongAgainstData.damage_relations.double_damage_to.map(damageData => damageData.name);

        const weakAgainstData = await (await fetch(typeContainer.type.url)).json();
        weakAgainst = weakAgainstData.damage_relations.double_damage_from.map(damageData => damageData.name);
    }

    const grid = document.createElement('div');
    grid.classList.add('grid');

    const firstGridElem = document.createElement('div');
    const secondGridElem = document.createElement('div');

    firstGridElem.classList.add('grid-elem');
    secondGridElem.classList.add('grid-elem');

    const firstGridHeader = document.createElement('p');
    const secondGridHeader = document.createElement('p');

    firstGridHeader.textContent = 'Forte Contra';
    secondGridHeader.textContent = 'Fraco Contra';

    firstGridHeader.classList.add('grid-header');
    firstGridHeader.classList.add('forte');

    secondGridHeader.classList.add('grid-header');
    secondGridHeader.classList.add('fraco');

    firstGridElem.appendChild(firstGridHeader);

    for(strongAgainstType of strongAgainst) {
        const strongAgainstElem = document.createElement('span');
        strongAgainstElem.textContent = strongAgainstType;
        strongAgainstElem.classList.add('type');

        firstGridElem.appendChild(strongAgainstElem);
    }

    secondGridElem.appendChild(secondGridHeader);

    for(weakAgainstType of weakAgainst) {
        const weakAgainstElem = document.createElement('span');
        weakAgainstElem.textContent = weakAgainstType;
        weakAgainstElem.classList.add('type');

        secondGridElem.appendChild(weakAgainstElem);
    }

    grid.appendChild(firstGridElem);
    grid.appendChild(secondGridElem);
    


    root.appendChild(img);
    root.appendChild(title);
    root.appendChild(types);
    root.appendChild(grid);
    console.log(pokemonDetail);
})()
