import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TextMessage } from '../models/text-message';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T> {
  private readonly APIUrl = environment.apiUrl;
  private readonly APIKey = environment.apiKey;

  constructor(protected httpClient: HttpClient ) {
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

  fromServerModel(json: any): T {
    return json;
  }


  getRequestOptions(content: string) {
    //var headers = new HttpHeaders({'Authorization' : `Bearer ${this.APIKey}`});
    var headers = {'Authorization' : `Bearer ${this.APIKey}`};
    var options = {      
      headers: headers,
      method: "POST",
      body: JSON.stringify(content), 
    };

    console.log(options);
    return options;
}

  post(message: string): Observable<T> {
    //TODO: add token, headers...
    console.log("log from resource service");
    console.log(this.APIUrl);

    var headers = new HttpHeaders({'Authorization' : `Bearer ${this.APIKey}`});

    return this.httpClient.post<T>(this.APIUrl, JSON.stringify(message), {headers})
      .pipe(
        map((json) => this.fromServerModel(json)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    //TODO: handle error depending on HuggingFace Inference API
    return throwError('Something wrong happened');
  }
}
