"use strict";
let cards = document.querySelectorAll('.app-card');
for (let card of cards) {
    card.addEventListener('click', fadingIn);
}
function fadingIn(event) {
    let card = event.target;
    let rc = document.querySelector('.rc');
    let rcPircture = document.querySelector('.rc-picture');
    let rcContent = document.querySelector('.rc-content');
    if (card && rc && rcPircture && rcContent) {
        getRcArticle(rcContent);
        expand(rc, card);
    }
    else {
        alert('The content you choosed is not exist anymore.');
    }
}
function expand(rc, card) {
    let rect = card.getBoundingClientRect();
    rc.setAttribute('style', 'display: block; top: ' + rect.top + 'px');
    let scrollBack = rect.top > 0 ? -rect.top / 10 : 0;
    rc.animate([
        {
            overflow: 'hidden',
            width: '343.3px',
            height: '400px',
            borderRadius: '20px',
            top: rect.top + 'px',
            margin: '0 1rem 0',
            easing: 'ease-out'
        },
        {
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            top: scrollBack + 'px',
            margin: '0',
            easing: 'ease-out'
        },
        {
            overflow: 'auto',
            width: '100%',
            height: '100%',
            borderRadius: '0px',
            top: '0px',
            margin: '0',
            easing: 'ease-out'
        }
    ], {
        duration: 500,
        iterations: 1,
        fill: "forwards"
    });
    // disable scroll
    document.body.style.overflow = 'hidden';
}
function getRcArticle(rcContent) {
    // TODO get article html from server
    rcContent.innerHTML = "Here is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some content";
    return true;
}
