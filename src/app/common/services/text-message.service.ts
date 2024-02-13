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
 * Used to send and receive textual messages (input: text, output: text)
 */
export class TextMessageService extends ResourceService<TextMessage> {
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

  // cast the answer into the right type
  override fromServerModel(json: any): TextMessage {
    return {
      type: "text",
      isAnswer: true,
      // temp fix due to changes in API
      text: json[0].generated_text
    };
  }

}
