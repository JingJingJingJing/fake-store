import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  currentTime: string;

  constructor() { }

  ngOnInit() {
    this.currentTime = this.getCurrentTime(new Date());
    const cards: NodeListOf<Element> = document.querySelectorAll('.app-card');
    cards.forEach((card) => {
      card.addEventListener('click', fadingIn);
    });
  }

  getCurrentTime(date: Date): string {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return date.getMonth() + '月' + date.getDay() + '日 ' + weekdays[date.getDay()];
  }

}
function fadingIn(event: Event) {
  const card: EventTarget | null = event.target;
  const rc: HTMLElement | null = document.querySelector('.rc');
  const rcPircture: HTMLElement | null = document.querySelector('.rc-picture');
  const rcContent: HTMLElement | null = document.querySelector('.rc-content');

  if (rcContent) {
      getRcArticle(rcContent);
      setTimeout(() => {
          if (rc && rcPircture) {
              expand(<HTMLElement>card, rc, rcPircture);
          } else {
              throw new ReferenceError('rc/rcPicture element is not exist.');
          }
      }, 100);
  } else {
      throw new ReferenceError('rcContent element is not exist.');
  }
}

function expand(card: HTMLElement, rc: HTMLElement, rcPircture: HTMLElement) {
  const rect: ClientRect = card.getBoundingClientRect();
  rcPircture.innerHTML = card.innerHTML;
  rc.setAttribute('style', 'display: block; top: ' + rect.top + 'px');
  const scrollBack: number = rect.top > 0 ? -rect.top / 10 : 0;
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
      } as Keyframe,
      {
          display: 'block',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          top: scrollBack + 'px',
          margin: '0',
          easing: 'ease-out'
      } as Keyframe,
      {
          display: 'block',
          overflow: 'auto',
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          top: '0px',
          margin: '0',
          easing: 'ease-out'
      } as Keyframe
], {
          duration: 500,
          iterations: 1,
          fill: 'forwards'
  });
  // disable scroll
  document.body.style.overflow = 'hidden';
}
function getRcArticle(rcContent: HTMLElement): boolean {
  // TODO get article html from server
  rcContent.innerHTML = 'Here contentHere is just some contentHere is just some contentHere is just some content';
  return true;
}
