"use strict";
showCurrentTime();
function showCurrentTime() {
    let timeElement = document.querySelector('.date-info>h6');
    if (timeElement)
        timeElement.innerHTML = getCurrentTime(new Date());
    else
        throw new ReferenceError('date element is not exist.');
}
function getCurrentTime(date) {
    let weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return date.getMonth() + '月' + date.getDay() + '日 ' + weekdays[date.getDay()];
}
let cards = document.querySelectorAll('.app-card');
for (let card of cards) {
    card.addEventListener('click', fadingIn);
}
function fadingIn(event) {
    let card = event.target;
    let rc = document.querySelector('.rc');
    let rcPircture = document.querySelector('.rc-picture');
    let rcContent = document.querySelector('.rc-content');
    if (rcContent) {
        getRcArticle(rcContent);
        setTimeout(function () {
            if (rc && rcPircture) {
                expand(card, rc, rcPircture);
            }
            else {
                throw new ReferenceError('rc/rcPicture element is not exist.');
            }
        }, 200);
    }
    else {
        throw new ReferenceError('rcContent element is not exist.');
    }
}
function expand(card, rc, rcPircture) {
    let rect = card.getBoundingClientRect();
    rcPircture.innerHTML = card.innerHTML;
    rc.setAttribute('style', 'display: block; top: ' + rect.top + 'px');
    let scrollBack = rect.top > 0 ? -rect.top / 10 : 0;
    rc.animate([
        {
            display: 'block',
            overflow: 'hidden',
            width: '90%',
            height: '380px',
            borderRadius: '20px',
            top: rect.top + 'px',
            margin: '0 1rem 0',
            easing: 'ease-out'
        },
        {
            display: 'block',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            top: scrollBack + 'px',
            margin: '0',
            easing: 'ease-out'
        },
        {
            display: 'block',
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
