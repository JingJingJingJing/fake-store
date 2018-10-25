"use strict";
let articles = document.querySelectorAll('.app-card');
for (let article of articles) {
    article.addEventListener('click', fadingIn);
}
function fadingIn(event) {
    let article = event.target;
    let rect = article.getBoundingClientRect();
    let recommend = document.querySelector('.rc');
    let rcPircture = document.querySelector('.rc-picture');
    let rcContent = document.querySelector('.rc-content');
    if (recommend && rcPircture && rcContent && article) {
        recommend.setAttribute('style', 'display: block; top: ' + rect.top + 'px');
        rcContent.innerHTML = "Here is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some content";
        // disable scroll
        let body = document.querySelector('body');
        if (body)
            body.style.overflow = 'hidden';
    }
    else {
        alert('The content you choosed is not exist anymore.');
    }
}
