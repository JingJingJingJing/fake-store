let articles: NodeListOf<Element> = document.querySelectorAll('.app-card');
for(let article of articles){
    article.addEventListener('click', fadingIn);
}
function fadingIn(event: Event){
    let article: EventTarget | null = event.target;
    let rect: ClientRect = (<Element>article).getBoundingClientRect();
    let recommend: HTMLElement | null = document.querySelector('.recommend');
    if(recommend){
        recommend.setAttribute('class', recommend.getAttribute('class') + " show");
        recommend.setAttribute('style', 'top:' + rect.top + 'px');
    }
}