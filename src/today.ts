let articles: NodeListOf<Element> = document.querySelectorAll('.app-card');
for (let article of articles) {
    article.addEventListener('click', fadingIn);
}
function fadingIn(event: Event) {
    let article: EventTarget | null = event.target;
    let rect: ClientRect = (<Element>article).getBoundingClientRect();
    let recommend: HTMLElement | null = document.querySelector('.rc');
    let rcPircture: HTMLElement | null = document.querySelector('.rc-picture');
    let rcContent: HTMLElement | null = document.querySelector('.rc-content');
    if (recommend && rcPircture && rcContent && article) {
        recommend.setAttribute('style', 'display: block; top: ' + rect.top + 'px');
        rcContent.innerHTML = "Here is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some contentHere is just some content";
        // disable scroll
        let body: HTMLElement | null = document.querySelector('body');
        if (body)
            body.style.overflow = 'hidden';
    } else {
        alert('The content you choosed is not exist anymore.');
    }
}