"use strict";
let articles = document.querySelectorAll('.app-card');
for (let article of articles) {
    article.addEventListener('click', fadingIn);
}
function fadingIn(event) {
    let article = event.target;
    let rect = article.getBoundingClientRect();
    let recommend = document.querySelector('.recommend');
    if (recommend) {
        recommend.setAttribute('class', recommend.getAttribute('class') + " show");
        recommend.setAttribute('style', 'top:' + rect.top + 'px');
    }
}
