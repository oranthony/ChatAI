import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { TextMessage } from '../models/text-message';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService extends ResourceService<TextMessage> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    //TODO: pass user message as param
      return "";
   }

   override fromServerModel(json: any): TextMessage{
    return {
      isAnswer: true,
      text: json.generated_text
    };
  } 

   /*override get(message: string): Observable<TextMessage> {
    console.log("log from chatbot service");
    return super.get(message);
   }*/

}
