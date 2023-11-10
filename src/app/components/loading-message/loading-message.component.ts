import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-message',
  templateUrl: './loading-message.component.html',
  styleUrls: ['./loading-message.component.scss']
})
export class LoadingMessageComponent {

  AIProfileIcon: string;

  constructor() {
    this.AIProfileIcon = '/assets/logo-short-bw-2.png';
  }

}
