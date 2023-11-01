import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChatAI';
  links = [
    { path: '/home', icon: 'home', title: 'Home'},
    { path: '/chatbot', icon: 'chat', title: 'Chatbot'},
    { path: '/picture-gen', icon: 'picture', title: 'PictureGen'}
  ];
}
