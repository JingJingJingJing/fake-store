import { Component, OnInit, Input } from '@angular/core';
import { AppInfo } from '../appInfo';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

  @Input() app: AppInfo;

  constructor() { }

  ngOnInit() {
    this.initialNav();
    this.initialDrag();
  }

  initialNav() {
    const rc: HTMLElement | null = document.querySelector('.rc');
    rc.addEventListener('scroll', event => {
      const nav: HTMLElement | null = document.querySelector('.footer-nav');
      const rcPicture: HTMLElement | null = document.querySelector('.rc-picture');
      const rcApp: HTMLElement | null = document.querySelector('.rc-app');
      const rcShare: HTMLElement | null = document.querySelector('.rc-share');
      const inMiddle: Boolean = rc.scrollTop > rcPicture.offsetHeight
        && rc.scrollTop < rc.scrollHeight - rc.offsetHeight - rcApp.offsetHeight - rcShare.offsetHeight;

      if (inMiddle && (nav.style.display === 'none' || !nav.style.display)) {
        nav.classList.remove('slice-down');
        nav.classList.add('slice-up');
        nav.style.display = 'flex';
      } else if (!inMiddle && (nav.style.display === 'flex')) {
        nav.classList.remove('slice-up');
        nav.classList.add('slice-down');
        nav.addEventListener('animationend', () => nav.style.display = 'none', { once: true });
      } else {
        return;
      }
    });
  }

  initialDrag() {
    const rc: HTMLElement = document.querySelector('.rc');
    initialDrag(rc);
  }
}

function initialDrag(rc: HTMLElement) {
  rc.addEventListener('touchstart', event => {
    const startPointer = event.touches[0];
    rc.ontouchmove = function (e) {
      const move: Touch = e.touches[0];
      scale(startPointer.clientX, startPointer.clientY, move.clientX, move.clientY);
    };
  });
  rc.addEventListener('touchend', resume);
}

function resume(event: Event) {
  const rc = <HTMLElement>event.currentTarget;
  rc.ontouchmove = null;
  scale(0, 0, 0, 0);
}

function scale(startX: number, startY: number, x: number, y: number) {
  const rc: HTMLElement = document.querySelector('.rc');
  const pullDown: Boolean = rc.scrollTop === 0 && y >= startY;
  const swipeRight: Boolean = startX < 20;
  if (!pullDown && !swipeRight)
    return;
  else {
    const scaleRate: number = pullDown ? 1 - (y - startY) / rc.offsetHeight : 1 - (x - startX) / rc.offsetHeight;
    if (scaleRate >= 0.9) {
      rc.animate({
        transform: [`scale(${scaleRate})`, `scale(${scaleRate})`]
      }, {
          iterations: 1,
          fill: 'forwards'
        }).play();
    } else {
      rc.animate({
        transform: [`scale(0.9)`, `scale(0.9)`]
      }, {
          iterations: 1,
          fill: 'forwards'
      }).play();
      rc.ontouchmove = null;
      rc.removeEventListener('touchend', resume);
      rc.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.setAttribute('style', '');
      const cardTop: number = parseFloat(rc.style.top.replace('px', ''));
      console.log(cardTop * scaleRate);
      rc.animate([
        {
          width: '100%',
          top: 0,
          height: '400px',
          borderRadius: '10px'
        } as AnimationKeyFrame,
        {
          width: '380px',
          top: cardTop * 0.9 + 'px',
          height: '440px',
          borderRadius: '20px'
        } as AnimationKeyFrame
      ], {
          duration: 300,
          iterations: 1,
          fill: 'forwards'
      });
      setTimeout(() => {
        rc.animate({
          transform: [`scale(0.9)`, `scale(1)`]
        }, {
            iterations: 1,
            fill: 'forwards'
        }).play();
        initialDrag(rc);
        rc.setAttribute('style', '');
      }, 500);
    }
  }
}
