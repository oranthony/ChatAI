import { NgModule, isDevMode  } from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { TitleTopBarComponent } from './components/title-top-bar/title-top-bar.component';
import { LoadingMessageComponent } from './components/loading-message/loading-message.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { AiModelDetailComponent } from './components/ai-model-detail/ai-model-detail.component';

import { StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { chatbotFeatureKey, chatbotFeature } from './state/chatbot/chatbot.reducer';
import { pictureGenFeature, pictureGenFeatureKey } from './state/picture-gen/picture-gen-reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChatbotEffects } from './state/chatbot/chatbot.effects';
import { PictureGenEffects } from './state/picture-gen/picture-gen.effects';

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
    AiModelDetailComponent,
  ],
  imports: [
    StoreModule.forRoot({}),
    StoreModule.forFeature(chatbotFeatureKey, chatbotFeature.reducer),
    StoreModule.forFeature(pictureGenFeatureKey, pictureGenFeature.reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([ChatbotEffects, PictureGenEffects]),
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
    MatSelectModule,
    MatMenuModule,
    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
