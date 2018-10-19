let cards = document.querySelectorAll('.app-card');
for(card of cards){
    card.addEventListener('click',fadindIn);
}

function fadindIn(event){
    let card = event.target;
    card.setAttribute('class', card.getAttribute('class') + " card-fading");
}