import { Component, OnInit } from '@angular/core';
import { AppInfo } from '../appInfo';
import { AppService } from '../app.service';
import 'web-animations-js';
import { element } from 'protractor';

@Component({
    selector: 'app-today',
    templateUrl: './today.component.html',
    styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

    currentTime: string;
    currentApp: AppInfo;
    apps: AppInfo[];

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.currentTime = getCurrentTime(new Date());
        this.getApps();
        const childs: NodeListOf<Element> = document.querySelectorAll('.app-card *');
        setTimeout(() => {
            for (const child of childs) {
                child.addEventListener('click', (event: Event) => event.stopPropagation());
            }
        }, 2000);
    }

    getApps() {
        this.appService.getApps().subscribe(apps => {
            this.apps = apps;
        });
    }

    fadingIn(app: AppInfo, event: Event) {
        this.currentApp = app;
        const card: EventTarget | null = event.currentTarget;
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

}

function getCurrentTime(date: Date): string {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return date.getMonth() + '月' + date.getDay() + '日 ' + weekdays[date.getDay()];
}

function expand(card: HTMLElement, rc: HTMLElement, rcPircture: HTMLElement) {
    const rect: ClientRect = card.getBoundingClientRect();
    const content: Element = <Element>card.firstElementChild;
    rcPircture.innerHTML = content.innerHTML;
    rcPircture.setAttribute('style', content.getAttribute('style'));
    rcPircture.setAttribute('class', content.getAttribute('class') + ' rc-picture');
    rc.setAttribute('style', 'display: block; top: ' + rect.top + 'px');
    // expand animation
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
        } as AnimationKeyFrame,
        {
            display: 'block',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            top: scrollBack + 'px',
            margin: '0',
            easing: 'ease-out'
        } as AnimationKeyFrame,
        {
            display: 'block',
            overflow: 'auto',
            width: '100%',
            height: '100%',
            borderRadius: '0px',
            top: '0px',
            margin: '0',
            easing: 'ease-out'
        } as AnimationKeyFrame
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
    return true;
}
