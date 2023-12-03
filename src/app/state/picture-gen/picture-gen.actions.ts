import { createAction, props } from '@ngrx/store';
import { ErrorMessageState } from 'src/app/common/models/message-state';
import { PictureMessage } from 'src/app/common/models/picture-message';
import { TextMessage } from 'src/app/common/models/text-message';

export const askAnswerAI = createAction('[PictureGen Page] Ask AI a question', props<{message: string}>());
export const addAnswerAI = createAction('[PictureGen Page] Add AI answer', props<{pictureMessage: PictureMessage}>());
export const addAnswerAIError = createAction('[PictureGen Page] Error on API request', props<{errorMessageState: ErrorMessageState}>());
export const addUserQuestion = createAction('[PictureGen Page] Add user question', props<{textMessage: TextMessage}>());
export const setAiModelName = createAction('[PictureGen Page] Error on API request', props<{aiModelName: string}>());