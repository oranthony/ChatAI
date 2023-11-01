import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatbotContainerComponent } from './containers/chatbot-container/chatbot-container.component';
import { PictureGenContainerComponent } from './containers/picture-gen-container/picture-gen-container.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'chatbot', component: ChatbotContainerComponent },
  { path: 'picture-gen', component: PictureGenContainerComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
