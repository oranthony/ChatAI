import { Injectable } from '@angular/core';
import { PictureMessage } from '../models/picture-message';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Used to send textual messages and receive picure (input: text, output: picture)
 */
export class PictureMessageService extends ResourceService<PictureMessage> {
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
  override fromServerModel(json: any): PictureMessage {
    return {
      type: "picture",
      isAnswer: true,
      picture: URL.createObjectURL(json)
    };
  }

  // Override post function to add optional paramaters to receive the answer as a blob
  override post(message: string): Observable<PictureMessage> {
    let headers = this.getHeaders();

    return this.httpClient.post<PictureMessage>(this.getResourceUrl(), message, { headers, responseType: 'blob' as 'json' })
      .pipe(
        map((json) => this.fromServerModel(json)),
        catchError(this.handleError)
      );
  }
}
