import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChatbotContainerComponent } from './containers/chatbot-container/chatbot-container.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { PictureGenContainerComponent } from './containers/picture-gen-container/picture-gen-container.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { TitleTopBarComponent } from './components/title-top-bar/title-top-bar.component';
import { LoadingMessageComponent } from './components/loading-message/loading-message.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ChatbotContainerComponent,
    MessageListComponent,
    MessageBoxComponent,
    PictureGenContainerComponent,
    HomeComponent,
    TitleTopBarComponent,
    LoadingMessageComponent,
    ErrorMessageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    TextFieldModule,
    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
