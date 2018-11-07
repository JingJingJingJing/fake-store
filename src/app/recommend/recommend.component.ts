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
    this.shouldShowNav();
  }

  shouldShowNav() {
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

}
