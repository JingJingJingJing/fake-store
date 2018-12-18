import { Component, OnInit, Input } from '@angular/core';
import { AppInfo } from '../appInfo';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

  @Input() app: AppInfo;

  constructor() { }

  startY: number;
  startX: number;
  scalable: Boolean = true;
  scaleRate = 0.9;

  ngOnInit() {
    this.initialDrag();
    this.initialNav();
    this.initalCloseBtn();
  }

  captureClientY(e: TouchEvent) {
    // only respond to a single touch
    if (e.targetTouches.length === 1) {
      this.startY = e.targetTouches[0].clientY;
      this.startX = e.targetTouches[0].clientX;
      const rc: HTMLElement | null = document.querySelector('.rc');
      rc.ontouchmove = this.preventOverScroll.bind(this);
    }
  }

  preventOverScroll(e: TouchEvent) {
    const target = document.querySelector('.rc');
    const moveY = e.targetTouches[0].clientY - this.startY;
    const onTop: Boolean = target.scrollTop === 0 && moveY > 0;
    const onBottm: Boolean = (target.scrollHeight - target.scrollTop === target.clientHeight) && moveY < 0;
    if (onTop || onBottm) {
      e.preventDefault();
    }
    if (this.scalable) {
      this.scale(e, this.startX, this.startY, e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  initialDrag() {
    const rc: HTMLElement | null = document.querySelector('.rc');
    rc.addEventListener('touchstart', this.captureClientY.bind(this), { passive: false });
    rc.addEventListener('touchmove', this.preventOverScroll.bind(this), { passive: false });
    rc.addEventListener('touchend', e => this.scalable = true);
    // rc.addEventListener('touchend', this.resume.bind(this));
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

  initalCloseBtn() {
    const closeBtn: HTMLElement = document.querySelector('.rc-close-btn');
    const rc: HTMLElement | null = document.querySelector('.rc');
    closeBtn.addEventListener('click', event => {
      this.backAnimation(rc, false);
    });
  }

  resume(event: Event) {
    const rc = <HTMLElement>event.currentTarget;
    rc.ontouchmove = null;
    if (rc.style.top) {
      this.scale(event, 0, 0, 0, 0);
    } else {
      return;
    }
  }

  scale(e: Event, startX: number, startY: number, x: number, y: number) {
    const rc: HTMLElement = document.querySelector('.rc');
    const pullDown: Boolean = rc.scrollTop === 0 && y > startY;
    const swipeRight: Boolean = startX < 20;
    if (!pullDown && !swipeRight) {
      return;
    } else {
      const scaleRate: number = pullDown ? 1 - (y - startY) / rc.offsetHeight : 1 - (x - startX) / rc.offsetWidth;
      if (scaleRate >= this.scaleRate) {
        rc.animate([{
          transform: `translateX(-50%) scale(${scaleRate})`,
          borderRadius: `${(1 - scaleRate) * 200}px`
        } as AnimationKeyFrame, {
          transform: `translateX(-50%) scale(${scaleRate})`,
          borderRadius: `${(1 - scaleRate) * 200}px`
        } as AnimationKeyFrame], {
            iterations: 1,
            fill: 'forwards'
          });
      } else {
        const nav: HTMLElement = document.querySelector('.footer-nav');
        nav.style.display = 'none';

        rc.animate([{
          transform: `translateX(-50%) scale(${this.scaleRate})`,
          borderRadius: '20px'
        } as AnimationKeyFrame, {
          transform: `translateX(-50%) scale(${this.scaleRate})`,
          borderRadius: '20px'
        } as AnimationKeyFrame], {
            iterations: 1,
            fill: 'forwards'
          });
        rc.ontouchmove = null;
        rc.removeEventListener('touchend', this.resume.bind(this));
        rc.scrollTo({ top: 0, behavior: 'smooth' });

        this.backAnimation(rc, true);

      }
    }
  }

  backAnimation(rc: HTMLElement, scale: Boolean) {
    this.scalable = false;
    const card = document.getElementById(this.app.id + '');
    card.style.visibility = 'hidden';
    const cardTop = card.getBoundingClientRect().top;
    const rollBack = cardTop * 0.1;
    let frames;
    if (scale) {
      frames = [
        {
          width: '100%',
          top: `0px`,
          height: `${rc.offsetHeight}px`,
          borderRadius: '0px',
          transform: `translateX(-50%) scale(${this.scaleRate})`
        } as AnimationKeyFrame,
        {
          width: '336px',
          top: `${cardTop + rollBack}px`,
          height: '400px',
          borderRadius: '20px',
          transform: 'translateX(-50%) scale(1)'
        } as AnimationKeyFrame,
        {
          width: '336px',
          top: `${cardTop}px`,
          height: '400px',
          borderRadius: '20px',
          transform: 'translateX(-50%) scale(1)'
        } as AnimationKeyFrame,
      ];
    } else {
      frames = [
        {
          width: '100%',
          top: `0px`,
          height: `${rc.offsetHeight}px`,
          borderRadius: '0px'
        } as AnimationKeyFrame,
        {
          width: '336px',
          top: `${cardTop + rollBack}px`,
          height: '400px',
          borderRadius: '20px'
        } as AnimationKeyFrame,
        {
          width: '336px',
          top: `${cardTop}px`,
          height: '400px',
          borderRadius: '20px'
        } as AnimationKeyFrame,
      ];
    }
    rc.animate(frames, {
        duration: 500,
        iterations: 1,
        fill: 'forwards',
        easing: 'linear',
    });
    const today: HTMLElement = document.querySelector('app-today>main');
    today.classList.remove('frosted-glass');
    setTimeout(() => {
      rc.animate({
        transform: [`translateX(-50%) scale(${this.scaleRate})`, 'translateX(-50%) scale(1)']
      }, {
          duration: 0,
          iterations: 1,
          fill: 'forwards'
        }).play();
      rc.setAttribute('style', '');
      card.style.visibility = '';
    }, 600);
  }
}

