import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { State } from "./chatbot.reducer";
import { addAnswerAI, addAnswerAIError, askAnswerAI } from "./chatbot.actions";
import { from, of } from "rxjs";
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { TextMessageService } from "src/app/common/services/text-message.service";
import { TextMessage } from "src/app/common/models/text-message";

@Injectable()
export class ChatbotEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private textMessageService: TextMessageService
  ) { }

  getAIAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(askAnswerAI),
      switchMap((action) => (
        this.textMessageService.post(action.message).pipe(
          map((answer: TextMessage) => addAnswerAI({ textMessage: answer })),
          catchError((error) => of(addAnswerAIError({errorMessageState: {state: "Error", error: { message: error }}})))
        ))
      )
    ));
}