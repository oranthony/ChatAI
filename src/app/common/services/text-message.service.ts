import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { TextMessage } from '../models/text-message';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * Handles to send and receive textual messages (input: text, output: text)
 */
export class TextMessageService extends ResourceService<TextMessage> {
  //private readonly APIUrl = environment.apiUrl;
  private APIUrl?: string;

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    if (this.APIUrl) {
      return this.APIUrl;
    } else {
      //TODO: throw error
      return "";
    }
    
  }

  setReourceUrl(resourceUrl: string) {
    this.APIUrl = resourceUrl;
  }

  override fromServerModel(json: any): TextMessage {
    return {
      isAnswer: true,
      text: json.generated_text
    };
  }

  // call the right concrete factory depending on the model

  /*override get(message: string): Observable<TextMessage> {
   console.log("log from chatbot service");
   return super.get(message);
  }*/

}
