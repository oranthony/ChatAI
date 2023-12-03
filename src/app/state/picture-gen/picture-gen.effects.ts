import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, catchError, of } from "rxjs";
import { askAnswerAI, addAnswerAI, addAnswerAIError } from "./picture-gen.actions";
import { State } from "./picture-gen-reducer";
import { PictureMessageService } from "src/app/common/services/picture-message.service";
import { PictureMessage } from "src/app/common/models/picture-message";

@Injectable()
export class PictureGenEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private pictureMessageService: PictureMessageService
  ) { }

  getAIAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(askAnswerAI),
      switchMap((action) => (
        this.pictureMessageService.post(action.message).pipe(
          map((answer: PictureMessage) => addAnswerAI({ pictureMessage: answer })),
          catchError((error) => of(addAnswerAIError({errorMessageState: {state: "Error", error: { message: error }}})))
        ))
      )
    ));
}