//poscitions
let index = 1;
let i = 1;
//setectors of buttons
const forwardBtn = document.querySelector('#forwardBtn');
const backBtn = document.querySelector('#backBtn');
const autoForwardBtn = document.querySelector('#autoForwardBtn');
const autoBackBtn = document.querySelector('#autoBackBtn');
const stopBtn = document.querySelector('#stopBtn');
//selectors of information
async function changes(data){
    let namePok = document.querySelector(`.pokemon:nth-child(${i}) .name`);
    namePok.innerText = data.name;
    let idPok = document.querySelector(`.pokemon:nth-child(${i}) .idPokemon`);
    idPok.innerText = data.id;
    let imagePok = document.querySelector(`.pokemon:nth-child(${i}) .image`);
    imagePok.src = data.img
    let abilitiesPok = document.querySelector(`.pokemon:nth-child(${i}) .abilities`);
    abilitiesPok.innerHTML = "";
    data.abilities.map(i =>{
        let child = document.createElement('li');
        child.innerText = i;
        abilitiesPok.appendChild(child);
    })
}

async function petition(){
let a = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
.then(Response => Response.json())
.then(pokemon =>{
    let data = {
        name: pokemon.name,
        id: pokemon.id,
        img: pokemon.sprites.front_default,
        abilities: Object.values(pokemon.abilities).map(i=>i.ability.name),
    }
    console.log(data);
    return data;
})
return a;}

async function threePetitions(){
    while(i <= 4){
        await changes(petition());
        index += i;
        i++;
    }
    i = 1
    index = index - 3;
}
function funForward(){
    if(index > 895){index = -1;}
    index++;
    threePetitions();
    console.log(index);
}
function funBack(){
    if(index <= 1){index = 895;}
    index--;
    threePetitions();
    console.log(index)
}
threePetitions();
forwardBtn.addEventListener("click", funForward);
backBtn.addEventListener("click", funBack);