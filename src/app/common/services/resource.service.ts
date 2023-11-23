import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TextMessage } from '../models/text-message';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T> {
  private readonly APIKey = environment.apiKey;

  constructor(protected httpClient: HttpClient) {
  }

  abstract getResourceUrl(): string;

  /*headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  private generateOptions(content: string) {
    return {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(content),
    };

  }*/

  /*
  fromServerModel(json: any): T {
    let textMessage: TextMessage = {
      isAnswer: true,
      text: json.generated_text
    }
    return textMessage;
  }
  */

  // Override this to cast the answer into the right type
  fromServerModel(json: any): T {
    return json;
  }

  post(message: string): Observable<T> {
    let headers = this.getHeaders();

    return this.httpClient.post<T>(this.getResourceUrl(), message, { headers })
      .pipe(
        map((json) => this.fromServerModel(json)),
        catchError(this.handleError)
      );
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.APIKey}`, 'Content-Type': 'application/json'});
  }

  handleError(error: HttpErrorResponse) {
    //TODO: handle error depending on HuggingFace Inference API
    console.log(error);
    return throwError('Something wrong happened');
  }
}
