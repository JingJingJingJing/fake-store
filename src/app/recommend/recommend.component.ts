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

  ngOnInit() {
  }

}
