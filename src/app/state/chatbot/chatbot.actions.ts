import { createAction, props } from '@ngrx/store';
import { ErrorMessageState } from 'src/app/common/models/message-state';
import { TextMessage } from 'src/app/common/models/text-message';

export const askAnswerAI = createAction('[chatbot Page] Ask AI a question', props<{message: string}>());
export const addAnswerAI = createAction('[chatbot Page] Add AI answer', props<{textMessage: TextMessage}>());
export const addAnswerAIError = createAction('[chatbot Page] Error on API request', props<{errorMessageState: ErrorMessageState}>());
export const addUserQuestion = createAction('[chatbot Page] Add user question', props<{textMessage: TextMessage}>());
export const setAiModelName = createAction('[chatbot Page] Error on API request', props<{aiModelName: string}>());
