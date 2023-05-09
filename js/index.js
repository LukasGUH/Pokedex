const pokeContainer = document.getElementById("pokeContainer");
const formulario = document.querySelector('form')
const pokemonCount = 151
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i ++)  {
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const getSearch = async (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    const resp = await fetch(url)
    const data = await resp.json()
    getSearchPokemon(data)
}

function constroiCard(id, name, type) {
    const pokemonInnerHtml = `
        <div class="img__container">
            <img src="https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
        `

    const card = document.createElement('div')
    card.className = 'pokemon'
    card.innerHTML = pokemonInnerHtml

    return card;
}


formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("name");
  const searchTerm = searchInput.value.toLowerCase();
  searchPokemon(searchTerm);
  searchInput.value = "";
});

const searchPokemon = async (searchTerm) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      if (response.status === 404) {
        console.log("No results found.");
        return;
      }
      const pokemon = await response.json();
      pokeContainer.innerHTML = "";
      createPokemonCard(pokemon);
    } catch (error) {
      console.log(error);
    }
  };
  

function getSearchPokemon(poke) {

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault()

        const search = document.getElementById('name').value
        const poke = await getSearch(search)

        const name = poke.name[0].toUpperCase() + poke.name.slice(1)
        const id = poke.id.toString().padStart(3, '0')

        const pokeTypes = poke.types.map(type => type.type.name)
        const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
        const color = colors[type]

        const card = constroiCard(id, name, type)
        card.style.backgroundColor = color

        pokeContainer.innerHTML = ''
        pokeContainer.appendChild(card)
    })
}

const botaosearch = document.getElementById('searchBotao')
botaosearch.addEventListener('click', evento => getSearchPokemon(evento))

getSearchPokemon()

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add('pokemon')

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHtml = `
        <div class="img__container">
            <img src="https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
        `

        card.innerHTML = pokemonInnerHtml

        pokeContainer.appendChild(card)
} 

fetchPokemons()
